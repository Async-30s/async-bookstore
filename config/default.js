var path = require('path');

module.exports = {
	port: 80,
	path: {
		public: path.join( __dirname, '..', 'public'),
		views: path.join(__dirname, '..', 'views')
	}
}