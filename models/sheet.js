//Dependencies
var db = require('../data-sources/db');
var config = require('./sheet.json');
var SheetModel = require('./sheetModel');
var Game = require('./game');

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
//Sheet.belongsTo(Game, {
//    as: 'game',
//    foreignKey: 'gameId'
//});