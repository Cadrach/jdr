// The Ability model

var mongoose = require('mongoose')
    ,Schema = mongoose.Schema
    ,ObjectId = Schema.ObjectId;

var abilitySchema = new Schema({
//    thread: ObjectId,
    name: String
});

module.exports = mongoose.model('Ability', abilitySchema);