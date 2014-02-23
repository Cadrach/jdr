/**
 * Module Dependencies
 */

var db = require('../data-sources/db');
var config = require('./dice.json');

/**
 * Feature
 */

var Dice = module.exports = db.createModel(
  'Dice',
  config.properties,
  config.options
);