// The Ruleset model

var mongoose = require('mongoose')
    ,Schema = mongoose.Schema
    ,ObjectId = Schema.ObjectId;

var ruleSetSchema = new Schema({
//    thread: ObjectId,
    name: String
});

module.exports = mongoose.model('RuleSet', ruleSetSchema);