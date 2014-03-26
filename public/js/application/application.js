/**
 * Module Definition
 */
angular.module('application', [
        'jdrUpdater', //updater
        'ngAnimate',
        'mgcrea.ngStrap',
        'mgcrea.ngStrap.tooltip',
        'ngRoute',
        'ngResource',
        'ngSanitize',
//        'ui.bootstrap',
        'ajoslin.promise-tracker', //promise-tracker
        'pascalprecht.translate', //translate
        'btford.socket-io', //Socket.io
//        'dialogs',
        'jdr' //generated Loopback angular services
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

})
.factory('jdrSocket', function (socketFactory, LoopBackAuth) {
    if( ! LoopBackAuth.accessTokenId)
    {
        throw 'Cannot connect to socket.io if not authentified'
    }

    //Create socket with tokenId
    var socket = io.connect('/', {query: 'authorization=' + LoopBackAuth.accessTokenId});

    //Use created socket
    var factory = socketFactory({
        ioSocket: socket
    });

    //On connection register the socket id
    socket.on('connect', function(){
        console.log('CONNECTED TO SOCKET', socket.socket.sessionid, socket);

    });

    //Return service
    return factory;
})
;