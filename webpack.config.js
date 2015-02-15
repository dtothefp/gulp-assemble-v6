var webpack = require('webpack');
var loadersByExtension = require("./config/loadersByExtension");

module.exports = function(options) {

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

  var webpackConfig =  {
    devtool: options.devtool,
    entry: [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      __dirname + '/app/js/index.jsx'
    ],
    output: {
      path: __dirname + '/build/assets/',
      filename: 'bundle.js',
      publicPath: '/assets/'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],
    resolve: {
      extensions: ['', '.js', '.jsx', '.scss']
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
  }

  return webpackConfig;
};
