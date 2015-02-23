var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var loadersByExtension = require("./config/loadersByExtension");

module.exports = function(options) {
  var isDev = options.isDev;

  var entry = {
    bundle: __dirname + '/app/assets/js/index.jsx'
  };

  var devEntry = [
    'webpack-dev-server/client?http://localhost:8000',
    'webpack/hot/only-dev-server'
  ];

  if(isDev) {
    entry = Object.keys(entry).map(function(filename) {
      return entry[filename];
    }).reduce(function(list, bundle) {
      return list.concat([bundle]);
    }, devEntry);
  }

  var preLoaders = {
    'jsx': {
      exclude: /node_modules/,
      loader: 'jsxhint-loader'
    },
    'js': {
      exclude: /node_modules/,
      loader: 'jshint-loader'
    }
  };

  var loaders = [
    { test: /\.jsx$/, exclude: /node_modules/, loaders: [ 'react-hot-loader', '6to5-loader' ]},
    { test: /\.js$/, exclude: /node_modules/, loader: '6to5-loader'}
  ];

  var stylesheetLoaders = {
    "scss": [
      "style-loader",
      "css-loader",
      "autoprefixer-loader?browsers=last 2 version",
      "sass-loader?imagePath=~stylesheets/blocks&includePaths[]=" + require('node-bourbon').includePaths
    ]
  };

  var devPlugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ];

  var prodPlugins = [
    new webpack.optimize.UglifyJsPlugin({output: {comments: false}}),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.NoErrorsPlugin()
  ];

  if(options.separateStylesheet) {
    stylesheetLoaders = [
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css') },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?browsers=last 2 version!sass?imagePath=~stylesheets/blocks&includePaths[]=' + require('node-bourbon').includePaths) }
    ];
    prodPlugins.push(new ExtractTextPlugin("main.css", {
        allChunks: true
    }));
  }

  var webpackConfig =  {
    devtool: options.devtool,
    entry: entry,
    output: {
      path: __dirname + (isDev ? '' : '/build') + '/assets/',
      filename: isDev ? 'bundle.js' : '[name].js',
      publicPath: '/assets/'
    },
    plugins: (isDev ? devPlugins : prodPlugins),
    resolve: {
      extensions: ['', '.js', '.jsx', '.scss'],
      root: path.join(__dirname, "app")
    },
    module: {
      preLoaders: loadersByExtension(preLoaders),
      loaders: loaders.concat(loadersByExtension(stylesheetLoaders))
    },
    jshint: {
        emitErrors: true,
        failOnHint: true
    },
    jsx: {
      insertPragma: 'React.DOM'
    }
  };

  return webpackConfig;
};
