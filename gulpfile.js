var gulp   = require('gulp'),
    less = require('gulp-less'),
    nmon   = require('gulp-nodemon');

gulp.task('watch', function(){
	gulp.src('./app/public/assets/style/styles.less')
	  .pipe(less())
	  .pipe(gulp.dest('./app/public/assets/style'));
    gulp.watch("./app/public/stylesheets/*.less", ['less']);
});

gulp.task('dev', function() {
  nmon({script: 'server.js'});
});

gulp.task('default', ['dev', 'watch']);
