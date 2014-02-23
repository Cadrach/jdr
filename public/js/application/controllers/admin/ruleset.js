
function controllerAdminRuleset($scope, $location, $translate, Ruleset) {
    "use strict";

    $scope.rule = null;

    $scope.$on('$locationChangeSuccess', function(){
        var id = $location.search().rule;
        if(id && (!$scope.rule || $scope.rule.id != id) )
        {
            $scope.rule = Ruleset.findOne({filter: {
                where: {id: id},
                include: 'sheets'
            }});
        }
    });

    $scope.addSheetModel = function(){
        $translate('NAME_NEW_SHEETMODEL_FOR_RULESET').then(function(text){
            var value = prompt(text)
            if(value)
            {
                $scope.sheets.push(Ruleset.prototype$__create__sheets({
                    id: $scope.rule.id
                }, {
                    name: value
                }));
            }
        })
    };
}