var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');

var buildDir = 'build';

gulp.task('clean', function () {
  return gulp.src(buildDir, { read: false })
    .pipe(clean());
});

gulp.task('build', ['clean'], function() {
  return gulp.src('src/*')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(buildDir));
});
