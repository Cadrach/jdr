
function controllerGameMain($injector, $scope, $routeParams, $translate, jdrSocket, promiseTracker, Game, Sheet) {
    "use strict";

    var gameSocket = jdrSocket('/game');

    //Controller Inheritance
    $injector.invoke(controllerAbstractMain, this, {
        $scope: $scope
    });

    $scope.game = null;
    $scope.sheets = [];
    $scope.trackerSheet = promiseTracker('sheet');

    /**
     * Load game
     */
    $scope.$watch('$routeParams.gameId', function(){
        //Load game
        var gameId = $routeParams.gameId;
        if(!$scope.game || $scope.game.gameId != gameId)
        {
            $scope.game = Game.findOne({filter: {
                where: {id: gameId},
                include: {
                    ruleset: 'sheets',
                    sheets: {players: {}},
                    messages: {}
                }
            }});
        }
    });

    /**
     * Alert when user connects to the game
     */
    gameSocket.on('userConnected', function(data){
        console.log('User connected', data)
    });

    $scope.newSheet = function(sheetModel){
        var value = prompt($translate.instant('NEW_SHEET_NAME'));
        if(value)
        {
            $scope.game.sheets.push(Sheet.create(null, {
                name: value,
                sheetModelId: sheetModel.id,
                gameId: $scope.game.id
            }));
        }
    }

}