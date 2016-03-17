/**
 * http://usejsdoc.org/
 */
var Async30_DB = require('./Async30_DB');
var db = new Async30_DB();

//db.printConfig();

/////////////////////////////////////////////////////////////////
// sample
/*
var sql = "SELECT name,model FROM t_table WHERE model=?";
var value = 'sung';
*/

/*
var sql = "UPDATE t_table SET model=? WHERE name=?";
var value = ['up_model','test1'];
*/

/*
var sql = "DELETE FROM t_table WHERE name=?";
var value = 'p222';
*/ 

/*
var sql = "INSERT INTO t_table SET ?";
var value = {name:'ppp',model:'sss',series:'jjj'};
*/

/*
var sql = "INSERT INTO t_table (name,model,series) VALUES ('asdf','asdf','asdf')";
var value;
*/

/*
var sql = "INSERT INTO t_table (name,model,series) VALUES (?,?,?)";
var value = ['p111','s111','j111'];
*/

/*
var sql = "INSERT INTO t_table (name,model,series) VALUES ?";
var value = [[
              ['p111','s111','j111'],
              ['p222','s222','j333']
         	]];
*/
/////////////////////////////////////////////////////////////////

//db.printConfig();
var sql = "SELECT name,model FROM t_table WHERE model=?";
var value = ['up_model','test'];

db.async_query(sql,value,function(err,result){
	if(err){
		console.log(err);
	}
	else{
		console.log(result);
	}
});

