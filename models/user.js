/**
 * DOC:
 * Reference of parameters for ACL
 * http://docs.strongloop.com/display/DOC/Model+definition+reference
 *
 */

var db = require('../data-sources/db');
var app = require('loopback');

// define a User model
var User = app.User.extend('User');

// attach to the memory connector
User.attachTo(db);

// also attach the accessToken model to a data source
User.accessToken.attachTo(db);

// expose over the app's API
module.exports = User;