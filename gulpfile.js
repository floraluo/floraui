var gulp = require('gulp');
var gbowerTask = require('gulp-bower-task');

gulp.task('default',function(){
	gulp.src('./bower.json')
		.pipe(gbowerTask())
		.pipe(gulp.dest('./lib/'));
})