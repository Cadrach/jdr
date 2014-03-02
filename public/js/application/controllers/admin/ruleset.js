
function controllerAdminRuleset($scope, $location, $translate, Ruleset) {
    "use strict";

    $scope.rule = null;

    /**
     * This function read the search param and load the ruleset if necessary
     */
    $scope.loadRuleset = function(){
        var id = $location.search().rule;
        console.log('RULE ID', $location.search().rule)
        if(id && (!$scope.rule || $scope.rule.id != id) )
        {
            console.log('SEARHING RULE' , $scope)
            $scope.rule = Ruleset.findOne({filter: {
                where: {id: id},
                include: 'sheets'
            }});
        }
    };

    /**
     * Load new ruleset when search changes
     */
    $scope.$on('$locationChangeSuccess', $scope.loadRuleset);

    /**
     * Load ruleset on controller load in case a ruleset is define in URL
     */
    $scope.loadRuleset();

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