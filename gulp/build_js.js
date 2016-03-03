var gulp       = require('gulp');
var browserify = require('browserify');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var babelify   = require('babelify');
var reactify   = require('reactify');
var uglify     = require('gulp-uglify');
var log        = require('log4js').getLogger('login_build');

gulp.task('dev:build_js', function() {
  browserify('./client/javascript/App.jsx', {
    debug: true,
    transform: [babelify]
  })
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/javascripts/built'));
});

gulp.task('prod:build_js', function() {
  browserify('./client/javascript/App.jsx', {
    debug: true,
    transform: [babelify]
  })
    .bundle()
    .on('error', function(e) {
      log.error(e);
    })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('public/javascripts/built'));
});
