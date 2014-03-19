module.directive('jdrModifier', function($modal, $popover, $timeout, $rootScope, $parse, $tooltip, jdrUpdater){

        function controller ($scope, $modal){
            //Scope vars
            $scope.popover = null;

            /**
             * Destroy the popover
             */
            $scope.$close = function(){
                if($scope.popover)
                {
                    $timeout(function(){
                        $scope.popover.destroy();
                        $scope.popover = null;
                    })
                }
            }

            /**
             * Observe opening at rootScope level to destroy any existing popover
             */
            $rootScope.$on('jdrModifier-new-popover', $scope.$close)

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
             * Remove an item
             */
            $scope.$delete = function(key){
                $scope.array.splice(key, 1);

                //Save to server
                jdrUpdater.update($scope.updater, $scope);

                //Refresh popover position
                $scope.refreshPopoverPosition();
            }

            /**
             * Open Popover
             */
            $scope.$popover = function(){

                //Announce that we open a popover, to close all others
                $scope.$emit('jdrModifier-new-popover');

                if( ! $scope.popover)
                {
                    //Create popover
                    $scope.popover = $popover($scope.element.children(), {
                        html: true,
                        placement: 'bottom-right',
                        scope: $scope,
                        template: 'templates/directives/jdr-modifier.html'
                    });

                    //Use promise to show & place the popover (workaround when fetching template the first time)
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

            //Element used by the controller to instanciate the popover
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

            //Define columns
            scope.columns = attrs.columns ? $parse(attrs.columns)(scope):[
                {
                    name: 'name',
                    label: 'NAME',
                    type: 'text'
                },
                {
                    name: 'value',
                    label: 'VALUE',
                    type: 'number',
                    width: '75px'
                }
            ];

            //Define title
            scope.title = attrs.title ? $parse(attrs.title)(scope):'EDIT_MODIFIERS';

            //Create tooltip
//            $tooltip(element, {
//                title: scope.title,
//                delay: {
//                    show: 500,
//                    hide: 0
//                }
//            });
        }

        return {
            restrict: 'E',
            require: 'ngModel',
            scope: {
                array: '=ngModel'
            },
            transclude: true,
            link: link,
            controller: controller,
//            templateUrl: 'templates/directives/jdr-modifier.html',
            template: '<button class="btn" ng-click="$popover()" ng-class="{\'btn-success\': array.length>0, \'btn-default\': !array.length}">' +
                '<i class="fa fa-pencil"></i> ' +
//                '{{array.length?array.length:0}}' +
                '</button>'
        }
});