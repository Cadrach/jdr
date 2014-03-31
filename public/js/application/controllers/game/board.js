
function controllerGameBoard($scope, jdrSocket, Game) {
    "use strict";

    var gameSocket = jdrSocket('/game');

    $scope.board = {
        inputManual: ''
    };

    $scope.send = function(){
        if($scope.board.inputManual)
        {
            Game.sendMessage({
                gameId: $scope.game.id,
                content: {
                    text: $scope.board.inputManual
                }
            });
        }
    }

    $scope.join = function(){
        //On success, connect to the game room
        if($scope.game.id)
        {
            gameSocket.emit('joinGame', $scope.game.id);
        }
    }

    gameSocket.on('newMessage', function(data){
        $scope.game.messages.push(data);
    });

    //On connection try to join the chat
    gameSocket.on('connect', function(){
        $scope.join();
    })

    //On game changes join the chat
    $scope.$watch('$routeParams.gameId', function(){
        $scope.join();
    });

    //And get connected users
//    Game.getConnectedUsers({gameId: gameId}, function(data){
//        console.log('CONNECTED USERS:', data.users);
//    })

}