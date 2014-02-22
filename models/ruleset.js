/**
 * Module Dependencies
 */

var db = require('../data-sources/db');
var config = require('./ruleset.json');
var SheetModel = require('./sheetModel')

/**
 * Ruleset Model
 */

var Ruleset = module.exports = db.createModel(
  'ruleset',
  config.properties,
  config.options
);

//A rule set can have many sheets models
Ruleset.hasMany(SheetModel);