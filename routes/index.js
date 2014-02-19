
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', {
      title: 'Express 8',
      date: (new Date()).toString()
  });
};