module.exports = function(app){
	console.log(new Date());
	
	//express include
	require('./express')(app);
	
	//routers include
	require('../routes/basic')(app);
}