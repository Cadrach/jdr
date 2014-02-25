
function controllerAbstractMain($scope, $location, Ruleset, FeatureModel, Game) {
    "use strict";

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

    $scope.setRoute = function(key, value)
    {
        $location.search(key, value);
    }
}