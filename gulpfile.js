var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function() {
    gulp.src('public/styles/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('public/styles/'))
});

//Watch task
gulp.task('default',function() {
    gulp.watch('public/styles/*.scss',['styles']);
});