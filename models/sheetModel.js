/**
 * Module Dependencies
 */

var db = require('../data-sources/db');
var config = require('./sheetModel.json');

/**
 * Ruleset Model
 */

var SheetModel = module.exports = db.createModel(
  'sheetmodel',
  config.properties,
  config.options
);
