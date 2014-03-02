
function controllerAdminFeatureModel($scope, $routeParams, FeatureModel) {
    "use strict";

    $scope.featureModel = null;

    $scope.$watch(function(){return $routeParams.featureModel}, function(){
        var id = $routeParams.featureModel;
        if(id && ( ! $scope.featureModel || $scope.featureModel.id != id) )
        {
//            $scope.featureModel = FeatureModel.findOne({filter: {
//                where: {id: id}
//            }});
            $scope.featureModel = FeatureModel.findById({id: id});

        }
    });
}