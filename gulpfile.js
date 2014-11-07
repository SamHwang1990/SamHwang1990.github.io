// 引入 gulp
var gulp = require('gulp');

// 引入 Plugins
var compass = require('gulp-compass');

// 创建 Compass 任务
gulp.task('compass', function() {
    gulp.src('./design/Stylesheet/scss/**')
        .pipe(compass({
            comments: false,
            css: 'css',
            sass: 'scss',
            image: 'img'
        }))
        .pipe(gulp.dest('./design/Stylesheet/css'));
});

// 默认任务
gulp.task('default', function() {
    gulp.run('compass');

    gulp.watch([
        './design/Stylesheet/scss/**',
        './design/Image/**'
    ], function(event) {
        gulp.run('compass');
    });
});