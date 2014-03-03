/**
 * Module Definition
 */
var module = angular.module('application', [
        'ngRoute',
        'ngResource',
//        'ngSanitize',
        'ui.bootstrap',
        'ajoslin.promise-tracker',
        'pascalprecht.translate',
        'dialogs',
        'jdr'
])
.config(function($translateProvider, $routeProvider){
    //    //Add header so that all Ajax calls are treated as such server side
    //    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    $translateProvider.translations('en', {
        'ADMINISTRATION': 'Administration Panel',
        'SHEETS': 'Sheets',
        'NAME_NEW_SHEETMODEL_FOR_RULESET': 'Specify the name of the new sheet added to the rules',
        'NAME_NEW_GROUP_FOR_SHEETMODEL': 'Specify the name of the new group added to the sheet',
        'CONFIRM': 'Are you sure?'
    });
    $translateProvider.preferredLanguage('en');

    $routeProvider.
        when('/game/:gameId', {
            templateUrl: '/templates/game.html',
            controller: 'controllerGameMain',
            reloadOnSearch: false
        }).
        when('/admin', {
            templateUrl: '/templates/admin.html',
            controller: 'controllerAdminMain',
            reloadOnSearch: false
        }).
        when('/login', {
            templateUrl: '/templates/login.html',
            controller: 'controllerLogin',
            reloadOnSearch: false
        })
        .otherwise({
            redirectTo: '/admin'
        });

})
.run(function(promiseTracker, $location, AppAuth, User){

    if($location.path() !== '/login')
    {
        //Redirect to login if no User identified
        AppAuth.ensureHasCurrentUser(User, function(){
            $location.url('/login');
        });
    }

    //Register promise trackers
    [
        'login',
        'updater'
    ].forEach(function(type){
        promiseTracker.register(type);
    });

});