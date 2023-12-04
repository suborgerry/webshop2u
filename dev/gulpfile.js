'use strict';

const gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  rename = require("gulp-rename"),
  sass = require('gulp-sass')(require('sass')),
  // sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify-es').default,
  sassLint = require('gulp-sass-lint');

/**
 * Asset paths.
 */
const sassSrc = 'sass/**/*.sass';
const jsSrc = 'js/*.js';
const assetsDir = '../assets/';

/**
 * Scss lint
 */
gulp.task('scss-lint', function () {
  return gulp.src(sassSrc)
    .pipe(sassLint());
});

/**
 * SCSS task
 */
gulp.task('css', function () {
  return gulp.src('sass/*.sass.liquid')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(rename(function (path) {
      path.basename = path.basename.replace('.sass', '');
    }))
    .pipe(gulp.dest(assetsDir));
});

/**
 * JS task
 *
 * Note: you may or may not want to include the 2 below:
 * babel polyfill and jquery
 */
const jsFiles = [
  jsSrc,
];
const jsDest = assetsDir;

gulp.task('js', function () {
  return gulp.src(jsFiles)
    .pipe(gulp.dest(jsDest))
    .pipe(uglify())
    .pipe(rename(function (path) {
      path.basename += '.min';
    }))
    .pipe(gulp.dest(jsDest));
});

/**
 * Watch task
 */
gulp.task('watch', function () {
  gulp.watch(sassSrc, gulp.series('css'));
  gulp.watch(jsSrc, gulp.series('js'));
});

/**
 * Default task
 */
gulp.task('default', gulp.series('css', 'js', 'watch'));