//Dependencies
var db = require('../data-sources/db');
var config = require('./game.json');
var Ruleset = require('./ruleset');

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