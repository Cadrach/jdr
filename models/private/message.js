//Dependencies
var db = require('../../data-sources/db');
var config = require('./message.json');
//var Game = require('./game');
var User = require('./../user');

var io = require('../../socket');
var loopback = require('loopback');

//Model
var Message = module.exports = db.createModel(
    'Message',
    config.properties,
    config.options
);

//Relations
Message.belongsTo(User, {
    as: 'user',
    foreignKey: 'userId'
});

//Access rights
Message.beforeRemote('**', function(ctx, message, next) {
    console.log(ctx.methodString, 'was invoked remotely'); // users.prototype.save was invoked remotely
    next();
});