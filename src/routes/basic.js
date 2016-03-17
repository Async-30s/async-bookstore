var controller = require('../controller/login');

module.exports = function(app){
	
	/* GET home page. */
	app.get('/', function(req, res, next) {
	  res.render('index', { title: 'Hello World' });
	});

	app.post('/login', function(req, res, next) {
		controller.login(req, res);
	});

	app.get('/join', function (req, res, next) {
		var fs = require('fs');
		fs.readFile('./views/join.html' , function (error, data) {
			res.writeHead(200, { 'Content-Type': 'text/html' });;
			res.end(data);
		});
	});
}