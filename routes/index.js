var fs = require('fs');
var path = require('path');

var walk = function(dir, done, prefix) {
    var results = [];

    fs.readdir(dir, function(err, list) {

        if (err)
        {
            return done(err);
        }

        var pending = list.length;
        if (!pending)
        {
            return done(null, results);
        }

        list.forEach(function(file) {

            var toStore = (prefix ? prefix + '/':'') + file;
            file = dir + '/' + file;

            fs.stat(file, function(err, stat) {

                if (stat && stat.isDirectory())
                {
                    walk(file, function(err, res) {
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    }, toStore);
                }
                else
                {
                    results.push(toStore);
                    if (!--pending) done(null, results);
                }

            });
        });
    }, prefix);
};

var controllers = [];
walk(path.join(__dirname, '../public/js/application/controllers'), function(err, results){
    controllers = results;
});

/*
 * GET home page.
 */

exports.index = function(req, res){
    res.render('index.jade', {
        controllers: controllers
    })
};