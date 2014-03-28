//Dependencies
var db = require('../data-sources/db');
var config = require('./game.json');
var Ruleset = require('./ruleset');
var Sheet = require('./sheet');
var Player = require('./player');

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
Game.hasMany('players', {model: Player});

/**
 * ************************ SOCKETS
 */
io.of('/game').on('connection', function (socket) {

    //Connecting to a game
    socket.on('joinGame', function(gameId){
        //TODO: check user is in the game
        console.log('JOINING GAME', gameId, 'USER', socket.handshake.userId);
        socket.join(gameId);
        socket.broadcast.to(gameId).emit('userConnected', socket.handshake.userId);
    });

});

/**
 * ************************ REMOTE METHODS
 */
//Declare remote methods
Game.getConnectedUsers = function(gameId, callback){
    var connected = {};
    io.of('/game').clients(gameId).forEach(function(socket){
        connected[socket.handshake.userId] = true;
    });
    console.log('CONNECTED USERS',  gameId, connected);
    callback(null, connected);
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