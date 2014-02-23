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
]).config(function($translateProvider){
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

}).run(function(promiseTracker){
//    //Register promise trackers
//    [
//        'patient',
//        'rdv',
//        'correspondant',
//        'salles',
//        'tache',
//        'updater'
//    ].forEach(function(type){
//        promiseTracker.register(type);
//    });
});