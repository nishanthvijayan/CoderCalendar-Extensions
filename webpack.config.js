module.exports = {
	entry: {
		"index" : "./app/index.js",
		"notifier_service": "./app/notifier_service.js",
		"event_listeners": "./app/event_listeners.js"

	},
	output:{
		path: __dirname + '/dist/js', 
		filename: '[name].js'
	},
	module: {
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/ , loader: 'babel-loader' }
		]
	},
}
