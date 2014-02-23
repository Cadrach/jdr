
function controllerAdminSheetModel($scope, $location, SheetModel) {
    "use strict";

    $scope.sheet = null;

    $scope.$on('$locationChangeSuccess', function(){
        var id = $location.search().sheet;
        if(id)
        {
            $scope.sheet = SheetModel.findById({id: id});
        }
    })
}