/**
 * Module Dependencies
 */

var db = require('../data-sources/db');
var config = require('./ruleset.json');

/**
 * Ruleset Model
 */

var Ruleset = module.exports = db.createModel(
  'ruleset',
  config.properties,
  config.options
);
