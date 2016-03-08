var express = require('express'),
	body_parser	= require('body-parser'),
	cookie_parser = require('cookie-parser'),
//	session = require('express-session'),
	config = require('config'),
	colors = require('colors');
//	flash = require('flash'),
//	passport = require('passport');


var cors_rule = function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Access-Control-Allow-Credentials', true);
	
	next();
};

module.exports = function(app){
	app.set('views', config.get('path.views'));
	app.set('view engine', 'jade');
	
	app.use(express.static(config.get('path.public')));
	app.use(cookie_parser());
	app.use(body_parser.json());
	app.use(body_parser.urlencoded({extended: true}));
}