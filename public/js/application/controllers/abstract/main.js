
function controllerAbstractMain($scope, $location, AppAuth, User) {
    "use strict";

    //Connect to user
    $scope.user = AppAuth.currentUser;

    /**
     * Retrieve shared methods
     */
    $scope.shared = sharedMethods;

    /**
     * Return TRUE if key=value is in route
     * @param values
     * @returns {boolean}
     */
    $scope.hasRoute = function(key, value)
    {
        var search = $location.search();
        return (! search[key] || (value && search[key]!=value)) ? false:true;
    }

    /**
     * Set a parameter in the url address bar
     * @param key
     * @param value
     */
    $scope.setRoute = function(key, value)
    {
        if(typeof key == 'object')
        {
            angular.forEach(key, function(key, value){
                $location.search(value, key);
            })
        }
        else
        {
            $location.search(key, value);
        }
    }

    /**
     * Disconnect User
     */
    $scope.disconnect = function(){
        User.logout(null, null, function(){
            $location.url('/login');
        });
    }
}