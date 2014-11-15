// 引入 gulp
var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var path = require('path');

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
        }))
        .pipe(minifyCSS({keepBreaks:true,noAdvanced:true}))
        .pipe(gulp.dest(path.join(__dirname, 'css')));;
});

// 默认任务
gulp.task('default',['compass'],function() {
    gulp.watch([
        './design/Stylesheet/scss/**',
        './design/Image/**'
    ],['compass']);
});