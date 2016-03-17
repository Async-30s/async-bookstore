var path = require('path');

module.exports = {
	port: 80,
	path: {
		public: path.join( __dirname, '..', 'public'),
		views: path.join(__dirname, '..', 'views')
	},
	view_engine: 'jade',
	db: {
		host: "localhost",
		user: "root",
		password: "root",
		databaseName: "async30s"
	}
}