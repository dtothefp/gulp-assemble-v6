var gulp = require('gulp');

gulp.task('build', ['jshint', 'sass', 'webpack', 'browserSync']);
