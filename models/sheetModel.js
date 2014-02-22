/**
 * Module Dependencies
 */

var db = require('../data-sources/db');
var config = require('./sheetModel.json');
var FeatureGroup = require('./featureGroup');
var Ruleset = require('./ruleset');

/**
 * Ruleset Model
 */

var SheetModel = module.exports = db.createModel(
  'sheetmodel',
  config.properties,
  config.options
);

SheetModel.hasMany('groups', {model: FeatureGroup});
