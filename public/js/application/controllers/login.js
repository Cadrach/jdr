
function controllerLogin($scope, $location, $translate, promiseTracker, User) {
    "use strict";

    $scope.login = {
        messages: []
    };

    //Track AJAX calls
    $scope.tracker = promiseTracker('login');

    /**
     * Connect User
     */
    $scope.connect = function(){
        //Reset validation messages
        $scope.clearMessages();

        //Log user
        var request = User.login({include: 'user', rememberMe: true}, {
            email: $scope.login.email,
            password: $scope.login.password
        }, function(){
            //Success
            $location.url('/admin')
        }, function(){
            //Error
            $scope.login.messages.push($translate.instant('WRONG_CREDENTIALS'));
        });
        $scope.tracker.addPromise(request.$promise);
    }

    /**
     * Register User
     */
    $scope.register = function(){
        //Reset validation messages
        $scope.clearMessages();

        //Validations
        if( ! $scope.login.password)
        {
            $scope.login.messages.push($translate.instant('MISSING_PASSWORD'));
        }

        if( ! $scope.login.email)
        {
            $scope.login.messages.push($translate.instant('MISSING_EMAIL'));
        }

        if( $scope.login.password && $scope.login.password.length < 4)
        {
            $scope.login.messages.push($translate.instant('PASSWORD_MUST_BE_4_CHARS_LONG_OR_MORE'));
        }

        if($scope.login.password && $scope.login.password != $scope.login.passwordConfirm)
        {
            $scope.login.messages.push($translate.instant('PASSWORDS_MUST_MATCH'));
        }

        //If all ok
        if($scope.login.messages.length == 0)
        {
            var request = User.create(null, {
                email: $scope.login.email,
                password: $scope.login.password
            }, function(){
                //Success
                $scope.connect();
            }, function(response){
                //Error
                angular.forEach(response.data.error.details.messages, function(array){
                    array.forEach(function(value){
                        $scope.login.messages.push($translate.instant(value));
                    });
                });
            });

            $scope.tracker.addPromise(request.$promise);
        }
    }

    /**
     * Clear messages
     */
    $scope.clearMessages = function(){

        $scope.login.messages = [];
    }
}