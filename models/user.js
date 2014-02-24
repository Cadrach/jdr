//Dependencies
var db = require('../data-sources/db');
var config = require('./user.json');

//Model
var JdrUser = module.exports = db.createModel(
  'JdrUser',
  config.properties,
  config.options
);

//Relations