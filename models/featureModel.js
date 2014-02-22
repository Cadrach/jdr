/**
 * Module Dependencies
 */

var db = require('../data-sources/db');
var config = require('./featureModel.json');

/**
 * Feature Model
 */

var FeatureModel = module.exports = db.createModel(
    'featuremodel',
    config.properties,
    config.options
);
