
function controllerAdmin($scope, $location, Ruleset) {
    "use strict";

    $scope.rules = Ruleset.find();

    $scope.hasRuleset = function(){
        return $location.search().rule ? true:false;
    }

    /**
     * Return TRUE if key=value is in route
     * @param values
     * @returns {boolean}
     */
    $scope.hasRoute = function(key, value)
    {
        var search = $location.search();
        return ! search[key] || search[key]!=value ? false:true;
    }
}