'use strict';

var gulp = require('gulp'),
	watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    rimraf = require('rimraf'),
    cleancss = require('gulp-clean-css');

var path = {
	build: {
		html: 'build/',
		js: 'build/js/',
		css: 'build/css/',
		img: 'build/img/',
		fonts: 'build/fonts/'
	},
	src: {
		html: 'src/*.html',
		js: 'src/js/main.js',
		style: 'src/style/main.scss',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*',
	},
	watch: {
		html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
	},
	clean: './build'
};

gulp.task('html:build', function() {
	gulp.src(path.src.html).pipe(gulp.dest(path.build.html));
});

gulp.task('js:build', function() {
	gulp.src(path.src.js).pipe(gulp.dest(path.build.js));
});

gulp.task('style:build', function() {
	gulp.src(path.src.style)
		.pipe(sass())
		.pipe(prefixer())
		.pipe(cleancss())
		.pipe(gulp.dest(path.build.css));
});

gulp.task('image:build', function () {
  gulp.src(path.src.img)
    .pipe(imagemin({
    	progressive: true,
    	svgoPlugins: [{removeViewBox: false}]
    }))
    .pipe(gulp.dest(path.build.img))
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'watch']);