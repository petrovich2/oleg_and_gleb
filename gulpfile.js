'use strict';

let gulp = require("gulp");
let sass = require("gulp-sass");

gulp.task('sass', function () {
    gulp.src(__dirname + '/sass/**/*.scss')
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(gulp.dest('./css'));
    return new Promise(function(resolve, reject) {
        console.log("HTTP Server Started");
        resolve();
      });
});

gulp.task('sasswatch', function () {
    gulp.watch('./sass/**.scss', gulp.series('sass'));
});