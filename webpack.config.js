const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = [
	{
    name: "chrome",
    entry: {
      "index" : "./app/index.js",
      "notifier_service": "./app/notifier_service.js",
      "event_listeners": "./app/event_listeners.js"

    },
    output:{
      path: __dirname + '/build/chrome', 
      filename: 'js/[name].js'
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/ , use: 'babel-loader' }
      ]
    },
    plugins: [
      new CopyWebpackPlugin([
        { from: 'css/chrome.css', to: 'css/index.css' },
        { from: 'index.html', to: 'index.html' },
        { from: 'manifest.json', to: 'manifest.json' },
        { from: 'img', to: 'img' },
        { from: 'font-awesome', to: 'font-awesome' }
      ])
    ]
  },
  {
    name: "firefox",
    entry: {
      "index" : "./app/index.js",
      "notifier_service": "./app/notifier_service.js",
      "event_listeners": "./app/event_listeners.js"

    },
    output:{
      path: __dirname + '/build/firefox', 
      filename: 'js/[name].js'
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/ , use: 'babel-loader' }
      ]
    },
    plugins: [
      new CopyWebpackPlugin([
        { from: 'css/firefox.css', to: 'css/index.css' },
        { from: 'index.html', to: 'index.html' },
        { from: 'manifest.json', to: 'manifest.json' },
        { from: 'img', to: 'img' },
        { from: 'font-awesome', to: 'font-awesome' }
      ])
    ]
	}
]
