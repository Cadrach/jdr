
//{
//    "accessType": "*",
//    "permission": "DENY",
//    "principalType": "ROLE",
//    "principalId": "$everyone"
//},
//Dependencies
var db = require('../data-sources/db');
var config = require('./game.json');
var Ruleset = require('./ruleset');
var Sheet = require('./sheet');
var Message = require('./message');
var Player = require('./player');
var User = require('./user');

var io = require('../socket');
var loopback = require('loopback');

//Model
var Game = module.exports = db.createModel(
  'Game',
  config.properties,
  config.options
);

//Relations
Game.belongsTo(Ruleset, {
    as: 'ruleset',
    foreignKey: 'rulesetId'
});

Game.hasMany('sheets', {model: Sheet});
Game.hasAndBelongsToMany ('players', {model: User, foreignKey: 'playerUserId'});
Game.hasAndBelongsToMany ('admins', {model: User, foreignKey: 'adminUserId'});
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
Game.getConnectedUsers = function(gameId, callback){
    var connected = {};
    ioGame.clients(gameId).forEach(function(socket){
        connected[socket.handshake.userId] = true;
    });
    console.log('CONNECTED USERS',  gameId, connected);
    callback(null, connected);
}

Game.sendMessage = function(gameId, content, callback){
    var message = Message.create({
        date: new Date,
        content: content,
        gameId: gameId
    }, function(){
        ioGame.in(gameId).emit('newMessage', message);
        console.log('NEW MESSAGE', message);
        ioGame.clients(gameId).forEach(function(socket){
            console.log('SENT TO', socket.id);
        });
        callback();
    });
}

//Access rights
Game.beforeRemote('**', function(ctx, message, next) {
    console.log(ctx.methodString, 'was invoked remotely'); // users.prototype.save was invoked remotely
    next();
});

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
        accepts: [{arg: 'gameId', type: 'string'}, {arg: 'content', type: 'object'}],
//        returns: {arg: 'users', type: 'object'},
        http: {path: '/sendMessage', verb: 'get'}
    }
);