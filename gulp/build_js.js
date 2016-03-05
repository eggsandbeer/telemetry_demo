var gulp       = require('gulp');
var browserify = require('browserify');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var babelify   = require('babelify');
var reactify   = require('reactify');
var uglify     = require('gulp-uglify');
var log        = require('log4js').getLogger('login_build');
var glob       = require('glob');
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

gulp.task('test:build_js', function(){


  var dependencies = [
  	'react',
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
    console.log('Building VENDORS bundle');
    vendorsBundler.bundle()
      .on('error', gutil.log)
      .pipe(source('vendors.js'))
      // .pipe(gulpif(!options.development, streamify(uglify())))
      .pipe(gulp.dest('test/'))
      .pipe(notify(function () {
        console.log('VENDORS bundle built in ' + (Date.now() - start) + 'ms');
      }));


  var testFiles = glob.sync('./specs/**/*-spec.js');
  var testBundler = browserify({
    entries: testFiles,
    debug: true, // Gives us sourcemapping
    transform: [babelify],
    cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
  });

  testBundler.external(dependencies);

  var rebundleTests = function () {
  		var start = Date.now();
  		console.log('Building TEST bundle');
  		testBundler.bundle()
      .on('error', gutil.log)
	      .pipe(source('specs.js'))
	      .pipe(gulp.dest('test/'))
	      .pipe(livereload())
	      .pipe(notify(function () {
	        console.log('TEST bundle built in ' + (Date.now() - start) + 'ms');
	      }));
  	};

    rebundleTests();


})
