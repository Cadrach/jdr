
function controllerLogin($scope, $location, User) {
    "use strict";

    $scope.login = {};

    /**
     * Connect User
     */
    $scope.connect = function(){
        User.login({include: 'user', rememberMe: true}, $scope.login, function(){
            $location.url('/admin')
        });
    }
}