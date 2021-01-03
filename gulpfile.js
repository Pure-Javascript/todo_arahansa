const dotenv = require('dotenv');
dotenv.config();
// import os to check os
const os = require('os');
const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const htmlReplace = require('gulp-html-replace');
const sass = require('gulp-sass');
const cssmin = require('gulp-cssnano');
const rename = require('gulp-rename');

const buildPath = 'gulp_dist/';
const srcPath = './';

// =======================================
// Static server
var browser = os.platform() === 'linux' ? 'google-chrome' : (
    os.platform() === 'darwin' ? 'google chrome' : (
        os.platform() === 'win32' ? 'chrome' : 'firefox'));
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {baseDir: "./gulp_dist"},
    browser: browser,
    port: 4000
  });
});


//Concatenate JS File: src/js 에 있는 파일들을 main.js 로 연결
gulp.task('scripts', function () {

  gulp.src(srcPath + 'js/*.js')
      .pipe(babel())
      .pipe(concat('common.js'))
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(gulp.dest(buildPath + 'js'));
});

/**
 * Replace html js, css
 * SEE: https://www.npmjs.com/package/gulp-html-replace
 */
gulp.task('html-copy', function () {

  const commonCss =[
    'css/style.min.css',
  ];

  const commonJs = [
    'js/common.min.js'
  ];

  gulp.src(srcPath + "*.html")
      .pipe(htmlReplace({ css: commonCss, js: commonJs}))
      .pipe(gulp.dest(buildPath));
});

gulp.task('sass', function () {
  browserSync.reload();

  console.log('sass ')

  console.log(buildPath)

  gulp.src([srcPath + 'scss/style.scss', srcPath + 'scss/custom.scss'])
      .pipe(sass({outputStyle : 'compact', style: 'compressed'}).on('error', sass.logError))
      .pipe(cssmin())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest(buildPath + 'css'))
});

//Watch project
gulp.task('watch', () => {
  gulp.watch(srcPath + 'js/*.js', ['scripts']);
  gulp.watch([srcPath + 'scss/*.scss'], ['sass']);
  gulp.watch(srcPath + '*.html', ['html-copy']);
});

//Build JavaScript, Images, Sass
gulp.task('build', ['scripts',  'sass', 'html-copy']);
// browser-sync
gulp.task('bs', ['build', 'browser-sync', 'watch']);

gulp.task('bs2', ['sass', 'browser-sync', 'watch']);
