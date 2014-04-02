/**
 * DOC:
 * Reference of parameters for ACL
 * http://docs.strongloop.com/display/DOC/Model+definition+reference
 *
 */

var db = require('../data-sources/db');
var loopback = require('loopback');
var ACL = loopback.ACL;

// define a User model
var User = loopback.User.extend('User',{

});

// attach to the memory connector
User.attachTo(db);

// also attach the accessToken model to a data source
User.accessToken.attachTo(db);


User.findByUsername = function(username, callback){
    console.log('FIND BY USERNAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAME');
}

//Link remote methods
loopback.remoteMethod(
    User.findByUsername,
    {
        accepts: {arg: 'username', type: 'string'},
        returns: {arg: 'users', type: 'object'},
        http: {path: '/findByUsername', verb: 'get'}
    }
);

ACL.create( {
    accessType: ACL.ALL,
    permission: ACL.ALLOW,
    principalType: ACL.ROLE,
    principalId: '$everyone',
    property: 'findByUsername'
});

// expose over the app's API
module.exports = User;