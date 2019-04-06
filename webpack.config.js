const CopyWebpackPlugin = require('copy-webpack-plugin')
const ZipPlugin = require('zip-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CreateFileWebpack = require('create-file-webpack')
const path = require('path');

const manifest = require("./manifest");
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
      new CleanWebpackPlugin({
        dry: false,
        cleanOnceBeforeBuildPatterns: ['**\/*', path.join(process.cwd(), 'build/*_Chrome.zip')],
        dangerouslyAllowCleanPatternsOutsideProject: true
      }),
      new CreateFileWebpack({
        fileName: 'manifest.json',
        path: __dirname + '/build/chrome',
        content: JSON.stringify(manifest)
      }),
      new CopyWebpackPlugin([
        { from: 'css/chrome.css', to: 'css/index.css' },
        { from: 'index.html', to: 'index.html' },
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
      new CleanWebpackPlugin({
        dry: false,
        cleanOnceBeforeBuildPatterns: ['**\/*', path.join(process.cwd(), 'build/*_Firefox.zip')],
        dangerouslyAllowCleanPatternsOutsideProject: true
      }),
      new CreateFileWebpack({
        fileName: 'manifest.json',
        path: __dirname + '/build/firefox',
        content: JSON.stringify(manifest)
      }),
      new CopyWebpackPlugin([
        { from: 'css/firefox.css', to: 'css/index.css' },
        { from: 'index.html', to: 'index.html' },
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
