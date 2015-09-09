var gulp = require('gulp');
var babel = require('gulp-babel');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var jetpack = require('fs-jetpack');
var del = require('del');

var buildDir = 'build';

gulp.task('clean', function () {
  return del([buildDir]);
});

gulp.task('transpile', ['clean'], function () {
  return gulp.src('src/**/*.{js,jsx}')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(buildDir));
});

gulp.task('copyCSS', ['clean'], function() {
  return jetpack
    .copyAsync('src/styles', 'build/styles', {
      matching: ['*.css'],
      overwrite: true
    });
});

gulp.task('less', ['clean'], function() {
  return gulp.src('src/styles/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('build/styles'));
});

gulp.task('build', ['clean', 'transpile', 'less', 'copyCSS']);
