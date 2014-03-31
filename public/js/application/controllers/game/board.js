
function controllerGameBoard($scope, Game) {
    "use strict";

    $scope.send = function(message){
        Game.sendMessage({
            gameId: $scope.game.id,
            content: {
                text: 'Test message'
            }
        })
    }

}