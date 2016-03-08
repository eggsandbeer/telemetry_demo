var gulp       = require('gulp');
var browserify = require('browserify');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var babelify   = require('babelify');
var reactify   = require('reactify');
var uglify     = require('gulp-uglify');
var log        = require('log4js').getLogger('login_build');
var gutil      = require('gulp-util');
var livereload = require('gulp-livereload');
var notify      = require('gulp-notify');

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
    log.info('apps.js - dev version built successful');
});

gulp.task('prod:build_js', function() {
  browserify('./client/javascript/App.jsx', {
    debug: false,
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
    log.info('apps.js - prod version built successful');
});

gulp.task('test:build_vendor_js', function(){

  var dependencies = [
  	'react',
    'react-router',
    'react/addons',
    'flux',
    'radium'
  ];

  // Run the vendor bundle
  var vendorsBundler = browserify({
    debug: true,
    require: dependencies
  });

  var start = new Date();
  vendorsBundler.bundle()
    .on('error', gutil.log)
    .pipe(source('vendors.js'))
    .pipe(gulp.dest('test/'))
    .pipe(notify(function () {
      console.log('VENDORS test js bundle built in ' + (Date.now() - start) + 'ms');
    }));
});
