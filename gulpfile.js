// Include gulp
var gulp = require('gulp');

// Include plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

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

gulp.task('watch', function() {
    // Watch .js files
    gulp.watch(["src/app/*.js",'src/controllers/*.js'], ['ctrlScripts']);
    // Watch .scss files
    gulp.watch('src/util/*.js', ['util']);
  });

// Default Task
gulp.task('default', ['ctrlScripts', 'util', 'watch']);