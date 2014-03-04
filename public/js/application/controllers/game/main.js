
function controllerGameMain($injector, $scope, $routeParams, $translate, Game, Sheet) {
    "use strict";

    //Controller Inheritance
    $injector.invoke(controllerAbstractMain, this, {
        $scope: $scope
    });

    $scope.game = null;
    $scope.sheets = [];
    $scope.sheet = null;

    /**
     * When search changes, loadSheet
     */
    $scope.$watch(function(){return $routeParams.sheet}, function(){
        var sheetId = $routeParams.sheet;
        if(sheetId && (!$scope.sheet || $scope.sheet.id != sheetId) )
        {
            Sheet.findOne({filter: {
                where: {
                    id: sheetId,
                    gameId: $routeParams.gameId
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
            }}, function(sheet){
                //Apply sheet through promise to avoid a flashing due to empty sheet
                $scope.sheet = new Decorator_Sheet(sheet);
            });
        }
    });

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
                    sheets: {players: {}}
                }
            }});
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