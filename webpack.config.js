module.exports = {
	entry: [
		'./app/index.js'
	],
	output:{
		path: __dirname + '/dist/js', 
		filename: 'index.js'
	},
	module: {
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/ , loader: 'babel-loader' }
		]
	},
}
