// Include gulp
var gulp = require('gulp');

// Include plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

// Concatenate JS Files
gulp.task('ctrlScripts', function() {
    return gulp.src(["src/app/*.js",'src/controllers/*.js'])   
        .pipe(concat('mainCtrl.js'))
            .pipe(gulp.dest('build/js'));
});
gulp.task('util', function() {
    return gulp.src('src/util/*.js')   
        .pipe(concat('lib.js'))
            .pipe(rename({suffix: '.min'}))
            .pipe(uglify())
            .pipe(gulp.dest('build/js'));
});

gulp.task('images', function() {
  return gulp.src('images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('build/img'));
});

gulp.task('watch', function() {
    // Watch .js files
    gulp.watch(["src/app/*.js",'src/controllers/*.js'], ['ctrlScripts']);
    gulp.watch('src/util/*.js', ['util']);
    // Watch image files
    gulp.watch('src/images/**/*', ['images']);
});

// Default Task
gulp.task('default', ['ctrlScripts', 'util', 'images', 'watch']);