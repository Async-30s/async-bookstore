module.exports = function(app){
	
	/* GET home page. */
	app.get('/', function(req, res, next) {
	  res.render('index', { title: 'Hello World' });
	});
	
	app.get('/join', function (req, res, next) {
		var fs = require('fs');
		fs.readFile('./views/join.html' , function (error, data) {
			res.writeHead(200, { 'Content-Type': 'text/html' });;
			res.end(data);
		});
	});
}