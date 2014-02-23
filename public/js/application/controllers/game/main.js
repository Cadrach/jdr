
function controllerGameMain($scope, $location, $translate, Game, Sheet) {
    "use strict";

    $scope.game = null;

    /**
     * Load game
     */
    $scope.$on('$locationChangeSuccess', function(){
        var id = $location.search().id;
        if(id && (!$scope.game || $scope.game.id != id) )
        {
            $scope.game = Game.findOne({filter: {
                where: {id: id},
                include: {ruleset: 'sheets'}
            }});
        }
    });

    $scope.newSheet = function(sheetModel){
        var value = prompt($translate.instant('NEW_SHEET_NAME'));
        if(value)
        {
            Sheet.create(null, {
                name: value,
                sheetModelId: sheetModel.id,
                gameId: $scope.game.id
            });
        }
    }

}