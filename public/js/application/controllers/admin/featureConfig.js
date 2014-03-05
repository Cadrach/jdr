
function controllerAdminFeatureConfig($scope, FeatureModel, feature, sheet) {
    "use strict";

    $scope.feature = feature;
    $scope.sheet = sheet;
    $scope.featureModel = FeatureModel.findById({id: $scope.feature.featureModelId});

    $scope.confirm = function(reason){
        $scope.$close(reason);
    }
}