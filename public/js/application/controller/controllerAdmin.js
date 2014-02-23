
function controllerAdmin($scope, $location, Ruleset) {
    "use strict";

    $scope.rules = Ruleset.find();

    $scope.hasRuleset = function(){
        return $location.search().rule ? true:false;
    }
}