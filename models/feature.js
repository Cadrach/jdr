/**
 * Module Dependencies
 */

var db = require('../data-sources/db');
var config = require('./feature.json');
var FeatureModel = require('./featureModel');

/**
 * Feature
 */

var Feature = module.exports = db.createModel(
  'feature',
  config.properties,
  config.options
);

Feature.belongsTo(FeatureModel, {
    as: 'model',
    foreignKey: '_id'
});