const {src, dest, watch, parallel, series} = require('gulp');
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');

// Минификация файлов
const htmlmin = require('gulp-htmlmin');
const cssmin = require('gulp-clean-css');
const jsmin = require('gulp-uglify-es').default;

// Объединение файлов
const concat = require('gulp-concat');
const include = require("gulp-file-include");
const cssimport = require("gulp-cssimport");


function html() {
  return src('src/index.html')
    .pipe(include({
      include: '@@',
    }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

function css() {
  return src('src/index.css')
    .pipe(cssimport())
    .pipe(cssmin())
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

function js() {
  return src('src/**/*.js')
    .pipe(concat('index.js'))
    .pipe(jsmin())
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

function watching() {
  watch(['src/**/*.html'], html);
  watch(['src/**/*.css'], css);
  watch(['src/**/*.js'], js);
}

function localhost() {
  browserSync.init({
    server: {
        baseDir: "dist/"
    }
  });
}

function cleanDist() {
  return src('dist')
  .pipe(clean());
}

exports.html = html;
exports.css = css;
exports.js = js;

exports.watch = watching;
exports.dev = parallel(localhost, watching);
exports.build = series(cleanDist, html, css, js);