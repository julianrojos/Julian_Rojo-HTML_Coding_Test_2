'use strict';

/* DEPENDENCIES
// ========================================================================== */
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var cssnano = require('gulp-cssnano');
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');


/* VARIABLES
// ========================================================================== */
var reload = browserSync.reload;


/* BROWSER SYNC
// ========================================================================== */
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
});


/* SASS COMPILING, PREFIXING AND MINIFYING
// ========================================================================== */
gulp.task('sass', function() {
    gulp.src('./app/sass/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(reload({
            stream: true
        }));
});


/* SCRIPTS MINIFYING
// ========================================================================== */
gulp.task('js', function() {
    gulp.src('./app/**/*.js')
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist'))
        .pipe(reload({
            stream: true
        }));
});


/* HTML MINIFYING
// ========================================================================== */
gulp.task('html', function() {
    gulp.src('./app/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('./dist'))
        .pipe(reload({
            stream: true
        }));
});


/* COPY FONTS
// ========================================================================== */
gulp.task('fonts', function() {
    gulp.src('./app/fonts/**/*.{ttf,woff,eof,svg}')
        .pipe(gulp.dest('./dist/fonts'));
});


/* WATCH
// ========================================================================== */
gulp.task('watch', ['browserSync', 'sass', 'js', 'html'], function() {
    gulp.watch('./app/sass/**/*.scss', ['sass']);
    gulp.watch('./app/*.html', ['html']);
    gulp.watch('./app/js/**/*.js', ['js']);
});
