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
.run(function(promiseTracker, $location, jdrSocket, AppAuth, User){

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
        'sheet',
        'updater'
    ].forEach(function(type){
        promiseTracker.register(type);
    });

    //Init sockets, ensures connection is valid when required
    [
        '/',
        '/game'
    ].forEach(function(type){
        jdrSocket(type);
    });

})
.factory('jdrSocket', function (socketFactory, LoopBackAuth) {

    var sockets = {};

    return function(namespace){
        //Default namespace is global
        namespace = namespace ? namespace:'/';

        if( ! sockets[namespace])
        {
            console.log('GENERATE SOCKET ', namespace, LoopBackAuth.accessTokenId)
            //Check authentification
            if( ! LoopBackAuth.accessTokenId)
            {
                throw 'Cannot connect to socket.io if not authentified'
            }

            //Create socket with tokenId
            var socket = io.connect(namespace, {query: 'authorization=' + LoopBackAuth.accessTokenId});

            //Use created socket
            var factory = socketFactory({
                ioSocket: socket
            });

            //On connection register the socket id
            factory.on('connect', function(){
                console.log('CONNECTED TO SOCKETNAMESPACE', socket.socket.sessionid, namespace, socket);
            })
            factory.on('error', function(){
                console.log('ERROR CONNECTING TO SOCKET', namespace, socket);
            });

            sockets[namespace] = factory;
        }
        return sockets[namespace];
    }

    //Return service
    return factory;
})
;