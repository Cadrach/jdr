
function controllerAbstractMain($scope, $location, Ruleset, FeatureModel, Game) {
    "use strict";

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
        $location.search(key, value);
    }
}