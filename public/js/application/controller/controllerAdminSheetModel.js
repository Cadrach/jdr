
function controllerAdminSheetModel($scope, $location, $translate, $dialogs, $modal, SheetModel, FeatureGroup, FeatureModel, Feature) {
    "use strict";

    /**
     * Scope variables
     * @type {null}
     */
    $scope.sheet = null;
    $scope.featureModels = FeatureModel.find();

    /**
     * Load sheet on route change
     */
    $scope.$on('$locationChangeSuccess', function(){
        var id = $location.search().sheet;
        if(id)
        {
            $scope.sheet = SheetModel.findOne({filter: {
                where: {id: id},
                include: {groups: 'features'}
            }});
        }
    });

    /**
     * Add a group to the model
     */
    $scope.addGroup = function(){
        var value = prompt( $translate.instant('NAME_NEW_GROUP_FOR_SHEETMODEL'))
        if(value)
        {
            $scope.sheet.groups.push(SheetModel.prototype$__create__groups({
                id: $scope.sheet.id
            }, {
                name: value
            }));
        }
    }

    /**
     * Remove a group from the model
     */
    $scope.removeGroup = function(group){
        $dialogs.confirm($translate.instant('CONFIRM')).result.then(function(){
            $scope.sheet.groups.splice($scope.sheet.groups.indexOf(group), 1);
            FeatureGroup.deleteById({id: group.id});
        });
    }

    /**
     *
     * @param group
     */
    $scope.addFeature = function(group){
        $modal.open({
            templateUrl: 'templates/admin/edit-feature.html',
            controller: controllerAdminFeature
        }).result.then(function(item){
            group.features.push(Feature.save({
                featureGroupId: group.id,
                name: item.name
            }));
        }, function(){
            console.log('delete');
        });
    }
}

function controllerAdminFeature($scope){
    $scope.item = {};


    /**
     * Cancel modal
     */
    $scope.confirm = function(){
        $scope.$close($scope.item);
    }
}