var gulp  = require('gulp');
var config= require('../config');

gulp.task('watch', ['setWatch', 'build', 'browserSync'], function() {
  gulp.watch(config.src + '/scss/**/*.scss', ['sass']);
  gulp.watch('./gulp/**/*.js', ['jshint']);
});
