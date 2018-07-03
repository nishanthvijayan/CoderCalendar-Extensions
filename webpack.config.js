const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	entry: {
		"index" : "./app/index.js",
		"notifier_service": "./app/notifier_service.js",
		"event_listeners": "./app/event_listeners.js"

	},
	output:{
		path: __dirname + '/dist/', 
		filename: 'js/[name].js'
	},
	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/ , use: 'babel-loader' }
		]
	},
	plugins: [
		new CopyWebpackPlugin([
		  { from: 'dist/css/index.css', to: 'css/mozilla.css' },
		])
	]
	  
}
