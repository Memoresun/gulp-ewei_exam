var gulp = require('gulp'); // gulp
var concat = require('gulp-concat'); // 合并文件
var connect = require('gulp-connect'); // 搭建本地服务器
var fileinclude = require('gulp-file-include'); // 复用HTML片段
var clean = require('gulp-clean-css'); // 压缩css

//begin
gulp.task('begin',function(){
	console.log('编译开始');
})

// 搭建本地服务器
gulp.task('server',function(){
	connect.server({
		root: 'dist',
		port: 5241,
		livereload: true // 实时刷新
	})
})

// HTML拼凑
gulp.task('fileinclude',function(){
	gulp.src('html/**.html')
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(gulp.dest('dist'))
		.pipe(connect.reload());
})

// images
gulp.task('images',function(){
	gulp.src('images/**/*')
		.pipe(gulp.dest('dist/static/images'))
})

// css
gulp.task('css',function(){
	gulp.src('style/lib/*.css')
		.pipe(clean({
			debug: true
		}))
		.pipe(gulp.dest('dist/static/style'))
})

gulp.task('concat',function(){
	console.log('css合并');
	gulp.src(['style/*.css'])
		.pipe(concat('main.css'))
		.pipe(gulp.dest('dist/static/style'))
})

// 监听
gulp.task('watch',function(){
	gulp.watch('html/**/*.html',['fileinclude']);
	gulp.watch('style/*.css',['css','concat']);
	gulp.watch('images/**/*',['images']);
})

gulp.task('default',['begin','fileinclude','images','css','concat','watch','server'],function(){
	console.log('编译成功');
})