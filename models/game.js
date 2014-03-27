//Dependencies
var db = require('../data-sources/db');
var config = require('./game.json');
var Ruleset = require('./ruleset');
var Sheet = require('./sheet');
var Player = require('./player');


var sys = require('sys');
var app = require('../app');
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


Game.getConnectedUsers = function(gameId, callback){
    var connected = {};
    sys.puts('CONNECTED USER IO:', app.io.sockets.clients('game/' + gameId));
    app.io.sockets.clients('game/' + gameId).forEach(function(socket){
        connected[socket.handshake.userId] = true;
    });

    callback(null, connected);
}

loopback.remoteMethod(
    Game.getConnectedUsers,
    {
        accepts: {arg: 'gameId', type: 'string'},
        returns: {arg: 'users', type: 'object'},
        http: {path: '/getConnectedUsers', verb: 'get'}
    }
);