
function controllerAdminMain($injector, $scope, $translate, Ruleset, FeatureModel, Game) {
    "use strict";

    //Controller Inheritance
    $injector.invoke(controllerAbstractMain, this, {
        $scope: $scope
    });

    $scope.rules = Ruleset.find();
    $scope.games = Game.find();
    $scope.featureModels = FeatureModel.find();

    $scope.tabs = [
        {
            title: $translate.instant('SHEETS'),
            template: 'templates/admin/tab-sheets.html'
        },
        {
            title: $translate.instant('GAMES'),
            template: 'templates/admin/tab-games.html'
        },
        {
            title: $translate.instant('CAMPAIGNS')
        },
        {
            title: $translate.instant('SCENARIOS')
        },
    ]
}