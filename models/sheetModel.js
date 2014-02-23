/**
 * Module Dependencies
 */

var db = require('../data-sources/db');
var config = require('./sheetModel.json');
var FeatureGroup = require('./featureGroup');
var Ruleset = require('./ruleset');
var loopback = require('loopback');

/**
 * Ruleset Model
 */

var SheetModel = module.exports = db.createModel(
  'SheetModel',
  config.properties,
  config.options
);

//Relations
SheetModel.hasMany('groups', {model: FeatureGroup});

//Full information
SheetModel.full = function(id, callback){
    SheetModel.findById(id, function(err, sheet){
        sheet.groups(function(err, groups){
            callback(err, sheet, groups);
        })
    });
}


//Remote methods
loopback.remoteMethod(
    SheetModel.full,
    {
        description: 'Returns full sheet informations',
        accepts: [
            {arg: 'id', type: 'String', required: true, description: 'The id of the sheet'}
        ],
        returns: [
            {arg: 'sheet', type: 'object'},
            {arg: 'groups', type: 'array' }
        ]
    }
);