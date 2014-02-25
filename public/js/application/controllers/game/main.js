
function controllerGameMain($injector, $scope, $location, $translate, Game, Sheet) {
    "use strict";

    //Controller Inheritance
    $injector.invoke(controllerAbstractMain, this, {
        $scope: $scope
    });

    $scope.game = null;
    $scope.sheets = [];

    /**
     * Load game
     */
    $scope.$on('$locationChangeSuccess', function(){
        //Load game
        var gameId = $location.search().id;
        if(gameId && (!$scope.game || $scope.game.gameId != gameId) )
        {
            $scope.game = Game.findOne({filter: {
                where: {id: gameId},
                include: {
                    ruleset: 'sheets',
                    sheets: {players: {}}
                }
            }});
        }

        //Load Sheet
        if(gameId)
        {
            var sheetId = $location.search().sheet;
            if(sheetId && (!$scope.sheet || $scope.sheet.id != sheetId) )
            {
                $scope.sheet = Sheet.findOne({filter: {
                    where: {
                        id: sheetId,
                        gameId: gameId
                    },
                    include: {
                        sheetModel: {
                            groups: {
                                features: {
                                    featureModel: {}
                                }
                            }
                        }
                    }
                }});
            }
        }
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