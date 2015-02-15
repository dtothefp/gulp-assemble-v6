var gulp = require('gulp');
var clean = require('gulp-clean');
var config = require('../config');

gulp.task('clean', function () {
    return gulp.src(config.dest, {read: false})
        .pipe(clean());
});