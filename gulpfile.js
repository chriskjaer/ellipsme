var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    browserSync = require('browser-sync');

gulp.task('js', function () {
  return gulp.src('ellipsme.js')
    .pipe(uglify())
    .pipe(concat('ellipsme.min.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('browser-sync', function () {  
  browserSync.init([
    './*.js',
    './*.html'
  ], {
    server: {
      baseDir: './'
    }
  });
});

gulp.task('default', ['browser-sync'], function () {
  gulp.watch('ellipsme.js', ['js']);
});
