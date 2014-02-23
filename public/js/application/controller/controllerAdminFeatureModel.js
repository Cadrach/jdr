
function controllerAdminFeatureModel($scope, $location, FeatureModel) {
    "use strict";

    $scope.featureModel = null;

    $scope.$on('$locationChangeSuccess', function(){
        var id = $location.search().featureModel;
        if(id && ( ! $scope.featureModel || $scope.featureModel.id != id) )
        {
//            $scope.featureModel = FeatureModel.findOne({filter: {
//                where: {id: id}
//            }});
            $scope.featureModel = FeatureModel.findById({id: id});

        }
    });
}