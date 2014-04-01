
function controllerGameSheet($scope, $routeParams, $modal, promiseTracker, Sheet) {
    "use strict";

    /**
     * Scope variables
     */
    $scope.sheet = null;
    $scope.trackerSheet = promiseTracker('sheet');

    /**
     * When search changes, loadSheet
     */
    $scope.$watch(function(){return $routeParams.sheet}, function(){
        var sheetId = $routeParams.sheet;
        if(sheetId && (!$scope.sheet || $scope.sheet.id != sheetId) )
        {
            var request = Sheet.findOne({filter: {
                where: {
                    id: sheetId,
                    gameId: $routeParams.gameId
                },
                include: {
                    sheetModel: {
                        groups: {
                            features: {
                                featureModel: {}
                            }
                        }
                    }
                }
            }}, function(sheet){
                //Apply sheet through promise to avoid a flashing due to empty sheet
                $scope.sheet = new Decorator_Sheet(sheet);
            });

            $scope.trackerSheet.addPromise(request.$promise);
        }
    });

    /**
     * Open the roll dice modal
     */
    $scope.roll = function(feature){
        //Create new isolated scope with some info
        var scope = $scope.$new(true);
        scope.feature = feature;

        //Load modal when everything is ready
        var modal = $modal({
            template: 'templates/game/sheet/modal-roll.html',
            scope: scope
        });
    }

}