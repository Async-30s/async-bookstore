var config = require('config'),
	path = require('path'),
	colors = require('colors');
	
var express = require('express'),
	http = require('http');

var app = express();
var server = http.createServer(app);

//dynamic import
require(path.join(__dirname, 'src', 'bootstrap', 'bootstrap'))(app);

app.set('port', config.get('port'));

process.on('uncaughtException', function (err){
	console.error((new Date).toUTCString() + ' uncaughtException : ', err.message);
	console.error(err.stack);
});

server.listen(app.get('port'), function(){
	console.log('#Node Server Started '.bold.blue + app.get('port'));
});