
function controllerGameMain($scope, $location, Game) {
    "use strict";

    $scope.game = null;
console.log('test');
    /**
     * Load game
     */
    $scope.$on('$locationChangeSuccess', function(){
        console.log('test2');
        var id = $location.search().id;
        if(id && (!$scope.game || $scope.game.id != id) )
        {
            $scope.game = Game.findOne({filter: {
                where: {id: id},
                include: 'ruleset'
            }});
        }
    });


}