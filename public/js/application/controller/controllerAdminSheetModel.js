
function controllerAdminSheetModel($scope, $location, SheetModel) {
    "use strict";

    $scope.sheet = null;

    $scope.$on('$locationChangeSuccess', function(){
        var id = $location.search().sheet;
        if(id)
        {
//            $scope.sheet = SheetModel.full({
//                id: id
//            });
            $scope.sheet = SheetModel.findOne({filter: {
                id: id,
                include: 'groups'
            }});
        }
    })
}