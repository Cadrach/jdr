//Dependencies
var db = require('../data-sources/db');
var config = require('./accessToken.json');

//Model
var JdrAccessToken = module.exports = db.createModel(
  'JdrAccessToken',
  config.properties,
  config.options
);

//Relations