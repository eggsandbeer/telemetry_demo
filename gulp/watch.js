var gulp        = require('gulp');
var source      = require('vinyl-source-stream');
var watchify    = require('watchify');
var browserify  = require('browserify');
var babelify    = require('babelify');
var notify      = require('gulp-notify');
var gutil       = require('gulp-util');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var log         = require('log4js').getLogger('watcher');
var livereload  = require('gulp-livereload');

function rebundleFile(fileBundler, destFile) {
  fileBundler
    .bundle()
    .on('error', notify.onError(function(error) {
      gutil.log(gutil.colors.red(error.message), gutil.colors.yellow('File Name:'+error.filename), gutil.colors.green('Line Number:'+error.loc.line));
      gutil.beep();
    }))
    .pipe(source(destFile))
    .pipe(gulp.dest('public/javascripts/built'))
    .pipe(reload({stream: true}));
    log.info(destFile + ' build successful');
}

function initBundlerWatch(bundler, fileName) {
  bundler.transform(babelify)
    .on('update', function() {
      rebundleFile(bundler, fileName);
    });
  rebundleFile(bundler, fileName);
}

gulp.task('app_watch', function() {
  var appBundler = watchify(browserify('./client/javascript/App.jsx', watchify.args));
  initBundlerWatch(appBundler, 'app.js');
});
