var gulp = require('gulp');
var path = require('path');
var gutil = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../../webpack-hot-dev-server.config.js');

//console.log(config);

console.log(path.join(process.cwd(), 'build'));

gulp.task('webpack', ['clean'], function(callback) {
    var compiler = webpack(config);

    new WebpackDevServer(compiler, {
      contentBase: path.join(process.cwd(), 'build'),
      publicPath: config.output.publicPath,
      hot: true
    }).listen(3000, 'localhost', function (err, result) {
        if(err) {
          throw new gutil.PluginError("webpack-dev-server", err);
        }
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:3000/webpack-dev-server/index.html");

        // keep the server alive or continue?
        callback();
    });
});