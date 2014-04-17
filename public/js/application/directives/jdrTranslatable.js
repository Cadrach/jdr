angular.module('application').directive('jdrTranslatable', function($translate){

        function controller ($scope, $modal){
            /**
             * Copy the current value to all others
             * @param current
             */
            $scope.copy = function(current){
                $scope.$languages.forEach(function(lang){
                    $scope.$item[lang] = $scope.$item[current];
                });
            }
        }
        function link(scope, element, attrs) {
            scope.$languages = ['en', 'fr', 'de'];
            if(!scope.$item)
            {
                scope.$item = {};
            }
            scope.$info = {current: $translate.use()};
        }

        return {
            restrict: 'E',
            require: 'ngModel',
            scope: {
                $item: '=ngModel'
            },
            link: link,
            controller: controller,
            templateUrl: 'templates/directives/jdr-translatable.html'
        }
});