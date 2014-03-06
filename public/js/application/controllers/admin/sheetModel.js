
function controllerAdminSheetModel($scope, $routeParams, $translate, $modal, SheetModel, FeatureGroup, FeatureModel, Feature) {
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
//        $dialogs.confirm($translate.instant('CONFIRM')).result.then(function(){
//            $scope.sheet.groups.splice($scope.sheet.groups.indexOf(group), 1);
//            FeatureGroup.deleteById({id: group.id});
//        });
        if(confirm('CONFIRM'))
        {
            $scope.sheet.groups.splice($scope.sheet.groups.indexOf(group), 1);
            FeatureGroup.deleteById({id: group.id});
        }
    }

    /**
     * Add a feature to the specified group
     * @param group
     */
    $scope.addFeature = function(group){
        var value = prompt($translate.instant('NEW_FEATURE'));
        if(value)
        {
            var data = {
                featureGroupId: group.id,
                name: value
            };

            if(group.features.length)
            {
                //Select featureModel from group first line
                data.featureModelId = group.features[0].featureModelId;
            }

            group.features.push(Feature.save(data));
        }
    }

    $scope.configFeature = function(feature){

        //Create new scope
        var scope = $scope.$new();
        scope.feature = feature;
        scope.featureModel = FeatureModel.findById({id: feature.featureModelId});

        //Load modal when everything is ready
        scope.featureModel.$promise.then(function(){
            var modal = $modal({
                template: 'templates/admin/feature-config/modal.html',
                scope: scope
            });
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