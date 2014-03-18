module.directive('jdrModifier', function($parse){

        function controller ($scope){

        }

        function link(scope, element, attrs, ngModel) {

            scope.lines = $parse(attrs.ngModel)(scope.$parent);

////            scope.lines = ngModel.$viewValue;
//            console.log(attrs.ngModel)
////            console.log(scope.$parent.game.ruleset.sheets)
//            console.log(scope.lines)

            if( ! scope.lines)
            {
                scope.lines = [];
            }
        }

        return {
            restrict: 'E',
            require: 'ngModel',
            scope: {
                ngModel: '='
            },
            link: link,
            controller: controller,
            templateUrl: 'templates/directives/jdr-modifier.html'
        }
});