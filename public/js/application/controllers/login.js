
function controllerLogin($scope, User) {
    "use strict";

    $scope.login = {};

    $scope.connect = function(){
        User.login({include: 'user', rememberMe: true}, $scope.login, function(){
            console.log(arguments);
        })
    }
}