
function controllerAdminSheetModel($scope, $routeParams, $translate, $dialogs, $modal, SheetModel, FeatureGroup, FeatureModel, Feature) {
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
    $scope.$watch(function(){return $routeParams.sheet}, function(){
        var id = $routeParams.sheet;
        if(id)
        {
            $scope.sheet = SheetModel.findOne({filter: {
                where: {id: id},
                include: {groups: {features: {}}}
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
     * Add a feature to the specified group
     * @param group
     */
    $scope.addFeature = function(group){
        var value = prompt($translate.instant('NEW_FEATURE'));
        if(value)
        {
            group.features.push(Feature.save({
                featureGroupId: group.id,
                name: value
            }));
        }
    }

    $scope.configFeature = function(feature){
        $modal.open({
            templateUrl: 'templates/admin/feature-model/modal.html',
            controller: controllerAdminFeatureConfig,
            resolve: {
                feature: function () {
                    return feature;
                },
                sheet: function(){
                    return $scope.sheet;
                }
            }
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