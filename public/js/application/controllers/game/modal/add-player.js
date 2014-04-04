
function controllerGameModalAddPlayer($scope, User, Game) {
    "use strict";

    $scope.info = {
        users: [],
        search: ''
    }
    $scope.$watch(function(){return $scope.info.search}, function(){
        User.findByUsername({username: $scope.info.search}, function(result){
            $scope.info.users = result.users;
        });
    });
    $scope.addPlayer = function(userId){
        Game.prototype$__create__players({},{id: $scope.game.id, playerUserId: userId});
        $scope.$hide();
    }

}