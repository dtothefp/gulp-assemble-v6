var gulp = require('gulp');

gulp.task('build', ['jshint', 'clean', 'sass', 'webpack', 'browserSync']);
