var Async30_DB = require('../module/mysql/Async30_DB');

exports.login = function(req, res, next){
	var db = new Async30_DB();
	
	var sql = "SELECT * FROM memberinfo WHERE email = ? and passwd = ?";
	var value = "";
	
	var emailID = req.body.emailID;
	var emailPW = req.body.emailPW;
	
	var sqlParam = [emailID, emailPW];
	
	console.log("sqlParam : " + sqlParam);
	
	db.async_query(sql, sqlParam, function(err, result){
		if(!err){
			console.log("result : " + result);
			
			if(result.length == 0){
				res.redirect('/');
			}else{
				res.redirect('main');
			}
			
		}else{
			console.log(err);
			
			res.redirect('/');
		}
	});
}