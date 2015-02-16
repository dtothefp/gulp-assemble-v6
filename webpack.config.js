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
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server'
  ];

  if(isDev) {
    entry = Object.keys(entry).map(function(filename) {
      return entry[filename];
    }).reduce(function(list, bundle) {
      return list.concat([bundle]);
    }, devEntry);
  }

  console.log('*******ENTRY*******', entry, options);

  var preLoaders = {
    'jsx': {
      exclude: /node_modules/,
      loader: 'jsxhint-loader'
    }
  };

  var loaders = {
    'jsx': ['react-hot', '6to5-loader']
  };

  var stylesheetLoaders = {
    "scss": [
      "style-loader",
      "css-loader",
      "autoprefixer-loader?browsers=last 2 version",
      "sass-loader?imagePath=~stylesheets/blocks&includePaths[]=./"
    ]
  };

  var devPlugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ];

  var prodPlugins = [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.NoErrorsPlugin()
  ];

  if(options.separateStylesheet) {
    prodPlugins.push(new ExtractTextPlugin("[name].css"));
  }

  var webpackConfig =  {
    devtool: options.devtool,
    entry: entry,
    output: {
      path: __dirname + (isDev ? '' : '/build') + '/assets/',
      filename: isDev ? 'bundle.js' : '[name].min.js',
      publicPath: '/assets/'
    },
    plugins: isDev ? devPlugins : prodPlugins,
    resolve: {
      extensions: ['', '.js', '.jsx', '.scss'],
      root: path.join(__dirname, "app")
    },
    module: {
      preLoaders: loadersByExtension(preLoaders),
      loaders: loadersByExtension(loaders).concat(loadersByExtension(stylesheetLoaders))
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
