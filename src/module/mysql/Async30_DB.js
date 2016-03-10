/**
 * http://usejsdoc.org/
 */
/**
 * author 	: Park sung joo
 * date		: 2016-03
 * module   : Async30's DataBase
 **/

var mysql = require('mysql');
var async = require('async');

function Async30_DB()
{
	this.config = {
			user     : 'sj',
			password : 'sj',
			database : 'sjdb' 
	};
	
	this.conn 			 = null;
	this.async_list 	 = [];
	this.sql			 = null;
}


Async30_DB.prototype.printConfig = function()
{
	console.log("config    : ",this.config);
};

Async30_DB.prototype.setConfig = function(conf)
{
	if(conf !== undefined && conf !== null)
	{
		if(typeof conf === 'object')
		{
			this.config = conf;
		}
	}
};

Async30_DB.prototype.conn_clear = function()
{
	this.conn 			 = null;
	this.async_list 	 = [];
	this.sql			 = null;
};

Async30_DB.prototype.async_query = function(sql,value,cb)
{
	if(sql === undefined || sql === null)
	{
		cb('Undefined SQL');
		return;
	}
	
	var self = this;
	self.sql = mysql.format(sql,value);
	self.async_start(function(err,result){
		
		// db connection info clear
		self.conn_clear();
		
		if(!err)
		{
			
			
		}
		
		cb(err,result);
	});
	
};

Async30_DB.prototype.async_start = function(cb)
{
	this.async_list.push(Async30_DB.async_proc(Async30_DB.async_connection,this));
	this.async_list.push(Async30_DB.async_proc(Async30_DB.async_query,this));
	this.async_list.push(Async30_DB.async_proc(Async30_DB.async_disconnection,this));
	
	async.series(this.async_list,cb);
};

Async30_DB.async_proc = function(proc_func,async_db)
{
	var call_func = function(cb){
		proc_func(async_db,function(err,result){
			if(err){
				cb(err);
			}
			else{
				cb(null,result);
			}
		});
	};
	
	return call_func;
};

Async30_DB.async_connection = function (async_db,cb)
{
	if(async_db.config !== undefined && async_db.config !== null)
	{
		async_db.conn = mysql.createConnection(async_db.config);
		async_db.conn.connect(function(err){
			if(err){
				cb('Async30_DB connection error : ' + err);
			}
			else{
				var flow = 'Async30_DB connection OK';
				cb(null,flow);
			}
		});
	}
	else
	{
		cb('Async30_DB connection config error');
	}
};

Async30_DB.async_query = function(async_db,cb)
{
	async_db.conn.query(async_db.sql , function(err, result) {
		if(err){
			cb('Async30_DB query error : ' + err);
		}
		else{
			var flow = 'Async30_DB query OK';
			cb(null,result);
		}
	});
};

Async30_DB.async_disconnection = function(async_db,cb)
{
	async_db.conn.end(function (err){
		if(err){
			cb('Async30_DB disconnection error : ' + err);
		}
		else{
			var flow = 'Async30_DB disconnection OK';
			cb(null,flow);
		}
	});
};

module.exports = Async30_DB;