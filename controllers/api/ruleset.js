
/*
 * GET home page.
 */

exports.index = function(req, res){
    res.render('index', {title: 'TEST FROM INDEX API'});
};