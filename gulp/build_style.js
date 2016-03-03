var gulp            = require('gulp');
var plumber         = require('gulp-plumber');
var stylus          = require('gulp-stylus');
var autoprefixer    = require('gulp-autoprefixer');
var jadeUsemin      = require('gulp-jade-usemin');
var revAll          = require('gulp-rev-all');
var uglify          = require('gulp-uglify');
var notify          = require('gulp-notify');
var rename       = require('gulp-rename');

gulp.task('build_vendor_css', function() {
  return gulp.src([
    './node_modules/bootstrap/dist/css/bootstrap.min.css'
  ])
  .on("error", notify.onError({
    message: "STOP STYLING!!! Error: <%= error.message %>"
  }))
  .pipe(rename('vendor.css'))
  .pipe(gulp.dest('./public/stylesheets/'));
});

gulp.task('build_css', function() {
  gulp.src('./client/stylesheets/main.styl')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(autoprefixer({ cascade: true }))
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('minify_style', ['build_css'], function() {
  gulp.src(['./views/**/*.jade'])
    .pipe(plumber())
    .pipe(jadeUsemin({
      assetsDir: './built',
      path: './built',
      outputRelativePath: '../../public/',
      js: [
        uglify({ mangle: true }),
        revAll()
      ],
      css: [revAll()]
    }))
    .pipe(gulp.dest('./built/views'));
});
