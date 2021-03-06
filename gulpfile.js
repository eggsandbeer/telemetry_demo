(function() {
  'use strict'

  var requireDir = require('require-dir');
  var gulp = require('gulp');
  var runSequence = require('run-sequence');
  var shell = require('gulp-shell');
  var nodemon = require('gulp-nodemon');
  var env = process.env.NODE_ENV || 'development';
  var webserver = require('gulp-webserver');

  requireDir('./gulp', { recurse: true });

  gulp.task('repo:setup', ['npm:install']);

  gulp.task('repo:clean', shell.task([
    'rm -rf public/',
    'rm -rf built/'
  ]));

  gulp.task('nodemon', function() {
    nodemon({
      script: 'bin/www',
      ext: 'js',
      watch: ['app.js', 'src/routes', 'src/models', 'src/config'],
      nodeArgs: ['--debug'],
      env: { 'NODE_ENV': env }
    });
  });

  gulp.task('move_fonts', function() {
    return gulp.src(['./client/fonts/**/*'])
      .pipe(gulp.dest('./public/fonts'));
  });

  gulp.task('move_images', function() {
    return gulp.src(['./client/images/**/*'])
      .pipe(gulp.dest('./public/images'));
  });

  gulp.task('move_scripts', function() {
    return gulp.src('./client/javascript/scripts/**/*')
      .pipe(gulp.dest('./public/javascripts'));
  });

  gulp.task('move_assets', function() { runSequence('move_fonts', 'move_images', 'move_scripts'); });

  gulp.task('dev:build_app', ['test:build_vendor_js', 'build_vendor_css', 'build_css', 'move_assets', 'dev:build_js']);

  gulp.task('build', function() { runSequence('repo:clean', ['prod:build_js', 'build_vendor_css', 'minify_style', 'move_assets', 'nodemon' ]); });

  gulp.task('default', function() { runSequence('repo:clean', ['dev:build_app', 'test_watch', 'app_watch', 'nodemon']); });
})();
