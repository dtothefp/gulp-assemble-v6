var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var gulp        = require('gulp');
var config      = require('../config').browserSync;

gulp.task('browserSync', ['webpack'], function() {
  browserSync({
      proxy: 'localhost:3000'
  });
});
