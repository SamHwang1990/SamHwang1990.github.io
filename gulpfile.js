// 引入 gulp
var gulp = require('gulp'),
path = require('path');

// 引入 Plugins
var compass = require('gulp-compass');

// 创建 Compass 任务
gulp.task('compass', function() {
    gulp.src('./design/Stylesheet/scss/**')
        .pipe(compass({
            comments: false,
            config_file: '../design/config.rb',
            project: path.join(__dirname, 'design'),
            css: 'Stylesheet/css',
            sass: 'Stylesheet/scss',
            image: 'Image'
        }));
});

// 默认任务
gulp.task('default',['compass'],function() {
    gulp.watch([
        './design/Stylesheet/scss/**',
        './design/Image/**'
    ],['compass']);
});