//Launch socket.io
var app = require('./app')
    , io = require('socket.io').listen(app.server)
    , loopback = require('loopback')
;


//Export io for further use
module.exports = io;

/**
 * When connecting to socket.io, allows to link socket to user & token
 */
io.set('authorization', function (handshakeData, accept) {

    //Check if we received auth information
    if (handshakeData.query.authorization) {

        console.log('SOCKET AUTHORIZED WITH TOKEN', handshakeData.query.authorization);
        handshakeData.authorization = handshakeData.query.authorization;

        loopback.getModel('AccessToken').findById(handshakeData.authorization, function(err, data){
            console.log('USER ADDED TO SOCKET', data.userId);
            handshakeData.userId = data.userId;
            accept(null, true);
        }, function(){
            accept('Error fetching user with token', false);
        })

    } else {
        return accept('No authorization transmitted.', false);
    }
});

/**
 * Connecting to a game
 */
io.sockets.on('connection', function (socket) {
    socket.emit('news', { data: socket.handshake });

    socket.on('gameConnect', function(gameId){
        //TODO: check user is in the game
        console.log('JOINING', gameId, socket.handshake.userId);
        var room = 'game/' + gameId;
        socket.join(room);
        socket.broadcast.to(room).emit('gameUserConnected', socket.handshake.userId);
    });
});

io.set('log level', 1);