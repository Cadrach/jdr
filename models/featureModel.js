/**
 * Module Dependencies
 */

var db = require('../data-sources/db');
var config = require('./featureModel.json');
//var Feature = require('./feature');

/**
 * Feature Model
 */

var FeatureModel = module.exports = db.createModel(
    'FeatureModel',
    config.properties,
    config.options
);

//FeatureModel.hasMany('features', {model: Feature});
