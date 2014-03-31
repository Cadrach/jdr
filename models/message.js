//Dependencies
var db = require('../data-sources/db');
var config = require('./message.json');
//var Game = require('./game');
var Player = require('./player');

var io = require('../socket');
var loopback = require('loopback');

//Model
var Message = module.exports = db.createModel(
  'Message',
  config.properties,
  config.options
);

//Relations
//Message.belongsTo(Game, {
//    as: 'game',
//    foreignKey: 'gameId'
//});
Message.belongsTo(Player, {
    as: 'player',
    foreignKey: 'playerId'
});