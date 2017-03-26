var gulp = require('gulp');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var browserSync = require('browser-sync');

gulp.task('styles', function() {
   return gulp.src('src/styles/main.scss')
       .pipe(sass().on('error', sass.logError))
       .pipe(gulp.dest('.tmp/css'));
});

gulp.task('inject', ['styles'], function() {
    var cssSources = gulp.src('.tmp/css/**/*.css', {read: false});
    return gulp.src('src/index.html')
        .pipe(inject(cssSources, {ignorePath: '.tmp'}))
        .pipe(gulp.dest('.tmp'))
        .pipe(browserSync.stream());
});

gulp.task('serve', ['inject'], function() {
    browserSync.init({
        server: '.tmp/'
    });

    gulp.watch(['src/index.html', 'src/styles/**/*.scss'], ['inject']);
    gulp.watch('.tmp/index.html').on('change', browserSync.reload);
});