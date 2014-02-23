
function controllerAdminMain($scope, $location, Ruleset, FeatureModel, Game) {
    "use strict";

    $scope.rules = Ruleset.find();
    $scope.games = Game.find();
    $scope.featureModels = FeatureModel.find();

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
}