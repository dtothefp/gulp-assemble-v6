var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var reload = require('browser-sync').reload;
var handleErrors = require('../util/handleErrors');
var config = require('../config');

gulp.task('sass', function () {
  return gulp.src(config.src + '/scss/**/*.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: true
    }))
    .pipe(sourcemaps.write('./'))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest))
    .pipe(reload({stream:true}));
});
