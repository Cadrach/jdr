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

////Full information
//SheetModel.findOneFull = function(id, callback){
//    SheetModel.find({
//        id: id,
//        include: 'groups'
//    }, function(err, sheet){
//        callback(err, sheet[0]);
//    });
//}
//
//
////Remote methods
//loopback.remoteMethod(
//    SheetModel.findOneFull,
//    {
//        description: 'Returns full sheet informations',
//        accepts: [
//            {arg: 'id', type: 'String', required: true, description: 'The id of the sheet'}
//        ],
//        returns: [
//            {arg: 'sheet', root: true}
//        ]
//    }
//);