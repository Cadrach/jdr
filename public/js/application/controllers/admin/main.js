
function controllerAdminMain($injector, $scope, $location, Ruleset, FeatureModel, Game) {
    "use strict";

    //Controller Inheritance
    $injector.invoke(controllerAbstractMain, this, {
        $scope: $scope
    });

    $scope.rules = Ruleset.find();
    $scope.games = Game.find();
    $scope.featureModels = FeatureModel.find();
}