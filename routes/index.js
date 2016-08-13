var filter = require('./lib/filter');
var user = require('./user');
var dotserver = require('./dotserver');
var product = require('./product');

module.exports = function(app) {
   app.all('*', function(req, res, next) {
	res.locals.user = req.session.user;
	
	next();
  });
	
  app.get('/(index.html)?', function (req, res) {
    res.render('tpl/index', { title: 'YiSite' });
  });
  
  app.post('/user/login', user.login);
  app.get('/user/logout', user.logout);
  app.get('/user', filter.authorize, user.profile);
  app.get('/user/:id', filter.authorize, user.profile);
  
  app.post('/dot/*', dotserver.proxy);
  
  app.get('/products', filter.authorize, product.list);
  app.get('/products/:pagenumber', filter.authorize, product.list);
  
  app.get('/product/:id', filter.authorize, product.product);
  
  app.get('/product/tagsuggest/:category', filter.authorize, product.tagsuggest);
  
};


