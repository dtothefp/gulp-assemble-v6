var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack-hot-dev-server.config.js');

new WebpackDevServer(webpack(config), {
  contentBase: path.join(process.cwd(), 'build'),
  publicPath: config.output.publicPath,
  hot: true
}).listen(5000, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:5000');
});
