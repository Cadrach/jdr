
function controllerAdminFeatureConfig($scope, FeatureModel, feature) {
    "use strict";

    $scope.feature = feature;
    $scope.featureModel = FeatureModel.findById({id: $scope.feature.featureModelId});

    $scope.confirm = function(reason){
        $scope.$close(reason);
    }
}