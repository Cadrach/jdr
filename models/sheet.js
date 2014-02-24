//Dependencies
var db = require('../data-sources/db');
var config = require('./sheet.json');
var SheetModel = require('./sheetModel');
var Game = require('./game');
var Player = require('./player');

//Model
var Sheet = module.exports = db.createModel(
  'Sheet',
  config.properties,
  config.options
);

//Relations
Sheet.belongsTo(SheetModel, {
    as: 'sheetModel',
    foreignKey: 'sheetModelId'
});
Sheet.hasMany('players', {model: Player});
//Sheet.belongsTo(Game, {
//    as: 'game',
//    foreignKey: 'gameId'
//});