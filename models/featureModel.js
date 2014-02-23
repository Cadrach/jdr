/**
 * Module Dependencies
 */

var db = require('../data-sources/db');
var config = require('./featureModel.json');

/**
 * Feature Model
 */

var FeatureModel = module.exports = db.createModel(
    'FeatureModel',
    config.properties,
    config.options
);
