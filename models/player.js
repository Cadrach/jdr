//Dependencies
var db = require('../data-sources/db');
var config = require('./player.json');

//Model
var Player = module.exports = db.createModel(
  'Player',
  config.properties,
  config.options
);

//Relations
//Game.belongsTo(Ruleset, {
//    as: 'ruleset',
//    foreignKey: 'rulesetId'
//});
//
//Game.hasMany('sheets', {model: Sheet})