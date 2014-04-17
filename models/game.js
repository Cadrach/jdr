//Dependencies
var db = require('../data-sources/db');
var config = require('./game.json');
var Ruleset = require('./ruleset');
var Sheet = require('./sheet');
var Message = require('./private/message');
var Player = require('./player');
var User = require('./user');
var util = require('util');

var io = require('../socket');
var loopback = require('loopback');

//Model
var Game = module.exports = db.createModel(
  'Game',
  config.properties,
  config.options
);

//Declare participant now only once Game is exported
var Participant = require('./private/participant');


//Relations
Game.belongsTo(Ruleset, {
    as: 'ruleset',
    foreignKey: 'rulesetId'
});
Game.hasMany('sheets', {model: Sheet});
Game.hasMany('participants', {model: Participant});
Game.hasMany('messages', {model: Message});

/**
 * ************************ SOCKETS
 */
io.of('/game').on('connection', function (socket) {

    //Connecting to a game
    socket.on('joinGame', function(gameId){
        //TODO: check user is in the game
        console.log('*** JOINING GAME ***', gameId, 'USER', socket.handshake.userId, 'SOCKET', socket.id);
        socket.join(gameId);
        socket.broadcast.to(gameId).emit('userConnected', socket.handshake.userId);
    });

});

/**
 * ************************ REMOTE METHODS
 */
var ioGame = io.of('/game');

//Declare remote methods
/**
 * Returns users connected to the game chat
 * @param gameId
 * @param callback
 */
Game.getConnectedUsers = function(gameId, callback){
    var connected = {};
    ioGame.clients(gameId).forEach(function(socket){
        connected[socket.handshake.userId] = true;
    });
    console.log('CONNECTED USERS',  gameId, connected);
    callback(null, connected);
}

/**
 * Send a message on the game chat
 * @param gameId
 * @param content
 * @param userId
 * @param callback
 */
Game.sendMessage = function(gameId, content, userId, callback){
    Message.create({
        date: new Date,
        content: content,
        gameId: gameId,
        userId: userId
    }, function(err, message){
        User.findById(userId, function(err, user){
            if(err || !user)
            {
                callback(err, false);
            }
            else
            {

                //Cloning message otherwise cannot add the user property
                var m = JSON.parse(JSON.stringify(message));
                m.user = {username: user.username};

                //Emit message to all connected users
                ioGame.in(gameId).emit('newMessage', m);

                //Debug message + list of socket sent to
                console.log('NEW MESSAGE', m);
                ioGame.clients(gameId).forEach(function(socket){
                    console.log('SENT TO', socket.id);
                });

                callback();
            }
        }, function(){
            callback('Error fetching user with token', false);
        })
    });
}

//Link remote methods
loopback.remoteMethod(
    Game.getConnectedUsers,
    {
        accepts: {arg: 'gameId', type: 'string'},
        returns: {arg: 'users', type: 'object'},
        http: {path: '/getConnectedUsers', verb: 'get'}
    }
);
loopback.remoteMethod(
    Game.sendMessage,
    {
        accepts: [
            {arg: 'gameId', type: 'string'},
            {arg: 'content', type: 'object'},
            {arg: 'userId', type: 'string', http: function(ctx){
                return ctx.req.accessToken.userId
            }}
        ],
        http: {path: '/sendMessage', verb: 'get'}
    }
);

//Access rights
Game.beforeRemote('**', function(ctx, message, next) {
    console.log(ctx.methodString, 'was invoked remotely'); // users.prototype.save was invoked remotely
    next();
});