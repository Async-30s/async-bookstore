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
var config = require('config');

function Async30_DB()
{
	this.config = {
			host	 : config.get('db.host'),
			user     : config.get('db.user'),
			password : config.get('db.password'),
			database : config.get('db.databaseName') 
	};

	// member variable
	this.conn 			 = null; // connection handling obj
	this.sql			 = null; // sql data
	this.sql_cmd		 = null; // sql command
	this.async_list 	 = [];   // processing function list
	
	// member function
	// Async30_DB.prototype.printConfig  
	// Async30_DB.prototype.setConfig    
	// Async30_DB.prototype.conn_clear   
	// Async30_DB.prototype.async_query  
	// Async30_DB.prototype.async_start 
}

// print db config info
Async30_DB.prototype.printConfig = function()
{
	console.log("config    : ",this.config);
};

// set db config info
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
// clear db connection info
Async30_DB.prototype.conn_clear = function()
{
	this.conn 			 = null;
	this.sql			 = null;
	this.sql_cmd		 = null; 
	this.async_list 	 = [];
};

Async30_DB.prototype.async_query = function(sql,value,cb)
{
	if(sql === undefined || sql === null)
	{
		cb('Undefined SQL');
		return;
	}
	
	if(!Async30_DB.query_valid(sql,value))
	{
		cb('Invalid SQL & value : sql = ' + sql +', value = ' + value );
		return;
	}
	
	var self = this;
	
	// get sql command
	var sql_data = sql.split(' ');
	self.sql_cmd = sql_data[0].toUpperCase();
	
	// bind value to sql 
	self.sql = mysql.format(sql,value);
	
	self.async_start(function(err,result){
		var reval;
		if(!err){
			if(self.sql_cmd === 'SELECT') {
				// select result
				reval = result[1];
			}
			else{
				reval = self.sql_cmd + '_OK';
			}
		}
		
		// db connection info clear
		self.conn_clear();
		cb(err,reval);
	});
	
};

Async30_DB.prototype.async_start = function(cb)
{
	this.async_list.push(Async30_DB.async_proc(Async30_DB.async_connection,this));
	this.async_list.push(Async30_DB.async_proc(Async30_DB.async_query_send,this));
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

Async30_DB.async_query_send = function(async_db,cb)
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

Async30_DB.query_valid = function(sql,val)
{
	var q_cnt=0;
	var v_cnt=0;
	var reval=0;
	
	for(var i=0; i<sql.length; ++i)
	{
		if(sql[i] === '?')
		{
			q_cnt++;
		}
	}
	
	((val instanceof Array) ? v_cnt = val.length : v_cnt = 1);
	((q_cnt === v_cnt) ? reval=1 : reval=0);
	
	return reval;
};

module.exports = Async30_DB;