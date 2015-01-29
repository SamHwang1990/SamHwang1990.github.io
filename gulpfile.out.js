// 引入 gulp
var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var path = require('path');

// 引入 Plugins
var compass = require('gulp-compass');

// 创建 Compass 任务
gulp.task('compassCSS', function() {
    gulp.src('./design/Stylesheet/scss/**')
        .pipe(compass({
            comments: false,
            config_file: path.join(__dirname, 'design/config.rb')
        }))
        .pipe(minifyCSS({keepBreaks:true,noAdvanced:true}))
        .pipe(gulp.dest(path.join(__dirname, 'css')));
});

gulp.task('compassJS',function(){
    gulp.src('./design/Javascript/**')
        .pipe(gulp.dest(path.join(__dirname, 'js')));
})

// 默认任务
gulp.task('default',['compassCSS','compassJS'],function() {
    gulp.watch([
        './design/Stylesheet/scss/**',
        './design/Image/**'
    ],['compassCSS']);
    gulp.watch([
        './design/Javascript/**'
    ],['compassJS']);
});