/**
 * Module Dependencies
 */

var db = require('../data-sources/db');
var config = require('./featureGroup.json');
var Feature = require('./feature');

/**
 * Feature Group
 */

var FeatureGroup = module.exports = db.createModel(
    'featuregroup',
    config.properties,
    config.options
);

FeatureGroup.hasMany('features', {model: Feature});