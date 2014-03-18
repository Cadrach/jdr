module.directive('jdrModifier', function($modal, $parse, jdrUpdater){

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
            }

            /**
             * Remove an item
             */
            $scope.$delete = function(key){
                $scope.array.splice(key, 1);

                //Save to server
                jdrUpdater.update($scope.updater, $scope);
            }
        }

        function link(scope, element, attrs) {

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
            templateUrl: 'templates/directives/jdr-modifier.html'
        }
});