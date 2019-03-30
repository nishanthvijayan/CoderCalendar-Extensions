const CopyWebpackPlugin = require('copy-webpack-plugin')
const ZipPlugin = require('zip-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const { version } = require('./package.json');

module.exports = [
	{
    name: "chrome",
    entry: {
      "index" : "./app/index.js",
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
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin([
        { from: 'css/chrome.css', to: 'css/index.css' },
        { from: 'index.html', to: 'index.html' },
        { from: 'manifest.json', to: 'manifest.json' },
        { from: 'img', to: 'img' },
        { from: 'font-awesome', to: 'font-awesome' }
      ]),
      new ZipPlugin({
        filename: `CoderCalendar_v${version}_Chrome`,
        path: '../'
      })
    ]
  },
  {
    name: "firefox",
    entry: {
      "index" : "./app/index.js",
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
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin([
        { from: 'css/firefox.css', to: 'css/index.css' },
        { from: 'index.html', to: 'index.html' },
        { from: 'manifest.json', to: 'manifest.json' },
        { from: 'img', to: 'img' },
        { from: 'font-awesome', to: 'font-awesome' }
      ]),
      new ZipPlugin({
        filename: `CoderCalendar_v${version}_Firefox`,
        path: '../'
      })
    ]
	}
]
