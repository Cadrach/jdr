//Dependencies
var db = require('../../data-sources/db');
var config = require('./participant.json');
var Game = require('./../game');
var User = require('./../user');

//Model
var Participant = module.exports = db.createModel(
    'Participant',
    config.properties,
    config.options
);

Participant.belongsTo(Game, {
    as: 'game',
    foreignKey: 'gameId'
});
Participant.belongsTo(User, {
    as: 'user',
    foreignKey: 'userId'
});

//Expose Participant publicly
//var app = require('../../app');
//app.model(Participant);
