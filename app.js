
/**
 * Module dependencies.
 */

var express = require('express');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var routes = require('./routes');
var io = require('socket.io');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));



// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Routes
app.get('/', routes.index);
app.get('/users', user.list);

var apiRuleSet = require('./controllers/api/ruleset.js');
app.get('/api/ruleset', apiRuleSet.index);

//Create server
var server = http.createServer(app);

//Listen on server
server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

//Create socket.io
var io = require('socket.io').listen(server);
io.set('log level', 1); //debug level reduced