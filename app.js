var config = require('config'), 
path = require('path'), 
colors = require('colors'); 
 	 
var express = require('express'), 
http = require('http'),
socketio = require('socket.io');
 
 
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

var io = socketio.listen(server);
io.sockets.on('connection', function(socket) {
	console.log('client connected');
	socket.on('rint', function (data) {
		console.log('email:'+data.inputEmail);
		console.log('pass:'+data.inputPassword);
    });
});