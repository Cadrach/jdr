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

/**
 * Find all user like username
 * @param username
 * @param callback
 */
User.findByUsername = function(username, callback){
    if(username)
    {
        User.find({
            where: {
                username: {like: username}
            },
            fields: {
                id: true,
                username: true,
                credentials: false
            }
        }, function(err, users){
            var clean = [];
            users.forEach(function(user){
                clean.push({
                    id: user.id,
                    username: user.username
                })
            })
            callback(err, clean);
        });
    }
    else{
        callback('Must provide a username or part of it.');
    }
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

//Authorize remote access to findByUsername method
ACL.create( {
    accessType: ACL.ALL,
    permission: ACL.ALLOW,
    principalType: ACL.ROLE,
    principalId: '$everyone',
    model: 'User', // Name of the model
    property: 'findByUsername' // Name of the property/method
});

// expose over the app's API
module.exports = User;