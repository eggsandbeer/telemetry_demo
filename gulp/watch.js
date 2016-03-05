var gulp        = require('gulp');
var source      = require('vinyl-source-stream');
var watchify    = require('watchify');
var browserify  = require('browserify');
var babelify    = require('babelify');
var notify      = require('gulp-notify');
var gutil       = require('gulp-util');
var glob        = require('glob');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var log         = require('log4js').getLogger('watcher');
var livereload  = require('gulp-livereload');

var rebundleFile = function (fileBundler, destFile) {
  fileBundler
    .bundle()
    .on('error', notify.onError(function(error) {
      gutil.log(gutil.colors.red(error.message), gutil.colors.yellow('File Name:'+error.filename), gutil.colors.green('Line Number:'+error.loc.line));
      gutil.beep();
    }))
    .pipe(source(destFile))
    .pipe(gulp.dest('public/javascripts/built'))
    .pipe(reload({stream: true}));
    log.info('apps.js build successful');
}

var initBundlerWatch = function(bundler, fileName) {
  bundler.transform(babelify)
    .on('update', function() {
      rebundleFile(bundler, fileName);
    });
  rebundleFile(bundler, fileName);
}

var testFiles = glob.sync('./specs/**/*-spec.js');

var testBundler = browserify({
  entries: testFiles,
  debug: true, // Gives us sourcemapping
  transform: [babelify],
  cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
});

var rebundleTests = function () {
  var start = Date.now();
  testBundler.bundle()
  .on('error', gutil.log)
    .pipe(source('specs.js'))
    .pipe(gulp.dest('test/'))
    .pipe(livereload())
    log.info('specs.js build successful');
};

gulp.task('app_watch', function() {
  var appBundler = watchify(browserify('./client/javascript/App.jsx', watchify.args));
  initBundlerWatch(appBundler, 'app.js');
});

gulp.task('test_watch', function() {
  testBundler = watchify(testBundler);
  testBundler.on('update', rebundleTests);
  rebundleTests();
});
