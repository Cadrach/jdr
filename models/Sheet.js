// The Sheet model

var mongoose = require('mongoose')
    ,Schema = mongoose.Schema
    ,ObjectId = Schema.ObjectId;

var sheetSchema = new Schema({
    ruleSet: ObjectId
});

module.exports = mongoose.model('Sheet', sheetSchema);