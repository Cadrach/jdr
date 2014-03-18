module.directive('jdrModifier', function($modal, $popover, $timeout, $rootScope, jdrUpdater){

        function controller ($scope, $modal){
            /**
             * Add an item
             */
            $scope.$add = function(){
                //Initialize array if necessary
                if( ! $scope.array)
                {
                    $scope.array = [];
                }

                //Push new line to array
                $scope.array.push({});

                //Save to server
                jdrUpdater.update($scope.updater, $scope);

                //Refresh popover position
                $scope.refreshPopoverPosition();
            }

            /**
             * Observe opening at rootScope level to destroy any existing popover
             */
            $rootScope.$on('jdrModifier-new-popover', function(){
                if($scope.popover)
                {
                    $timeout(function(){
                        $scope.popover.destroy();
                        $scope.popover = null;
                    })
                }
            })

            /**
             * Remove an item
             */
            $scope.$delete = function(key){
                $scope.array.splice(key, 1);

                //Save to server
                jdrUpdater.update($scope.updater, $scope);

                //Refresh popover position
                $scope.refreshPopoverPosition();
            }

            $scope.popover = null;
            $scope.$popover = function(){

                $scope.$emit('jdrModifier-new-popover');

                if( ! $scope.popover)
                {

                    $scope.popover = $popover($scope.element, {
                        title: 'TEST',
                        html: true,
                        placement: 'left',
                        scope: $scope,
                        contentTemplate: 'templates/directives/jdr-modifier.html'
                    });

                    $scope.popover.$promise.then(function(popover){
                        $timeout(function(){
                            $scope.popover.show();

                            //Refresh popover position
                            $scope.refreshPopoverPosition();
                        })
                    });
                }

            }

            /**
             * Reposition the popover
             */
            $scope.refreshPopoverPosition = function(){
                $timeout(function(){
                    $scope.popover.$applyPlacement();
                });
            }
        }

        function link(scope, element, attrs) {

            scope.element = element;

            //Pass updater to inputs below
            if(attrs.updater)
            {
                //Pass the updater config
                var string = attrs.updater;
                scope.updater = attrs.updater;

                //Pass the updater item to the scope
                var itemName = string.split('.').slice(0, 1).join();
                scope[itemName] = scope.$parent[itemName];
            }
        }

        return {
            restrict: 'E',
            require: 'ngModel',
            scope: {
                array: '=ngModel',
                columns: '='
            },
            transclude: true,
            link: link,
            controller: controller,
//            templateUrl: 'templates/directives/jdr-modifier.html',
            template: '<button class="btn btn-success" ng-click="$popover()"><i class="fa fa-plus"></i></button>'
        }
});