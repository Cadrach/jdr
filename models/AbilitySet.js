// The AbilitySet model

var mongoose = require('mongoose')
    ,Schema = mongoose.Schema
    ,ObjectId = Schema.ObjectId;

var abilitySetSchema = new Schema({
//    thread: ObjectId,
    name: String
});

module.exports = mongoose.model('AbilitySet', abilitySetSchema);