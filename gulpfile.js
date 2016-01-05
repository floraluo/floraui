var gulp = require('gulp');
var gbowerTask = require('gulp-bower-task');
var sass = require('gulp-sass');

var path = {
	sass: "./sass/**/*.{scss,sass}",
	bower: "./bower.json"
}
gulp.task('sass', function () {
	gulp.src(path.sass)
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(gulp.dest('./css'));
});

gulp.task('bower',function(){
	gulp.src(path.bower)
		.pipe(gbowerTask())
		.pipe(gulp.dest('./lib/'));
})

gulp.task('watch', function() {
	gulp.watch(path.sass, ['sass']);
	gulp.watch(path.bower, ['bower']);
});

gulp.task('default', ['sass', 'watch']);