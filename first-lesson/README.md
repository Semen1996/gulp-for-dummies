# Основы

Тут познакомимся с основами работы с Gulp. Рабочий пример находится в этой папке.

## gulpfile.js

Рассмотрим базовую настройку gulpfile.js, чтобы понять основы работы с ним

```js
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
```


### 0. Запуск программ

Создание любого таска (export нужен, чтобы вызвать его через консоль)
```js
function first() {
...
}

exports.exam = first;
```

Вызов через консоль осуществляется следующим образом
```
gulp exam
```



### 1. src, dest, pipe

Эти команды позволяют нам взять файлы из одного места и добавить в другое

- `src` - в ней мы указываем откуда мы берем файлы
- `dist` - в ней мы указываем куда мы кладем итоговые файлы
- `pipe` - это выполнение следующей задачи (типа then())



### 2. Объединение файлов

Часто нам необходимо сложить все файлы в один. Для этого существует множество плагинов в gulp,
но мне понравились следующие:

- `concat(file)` - объединяет все файлы в один плагин 'gulp-concat'. Классно использовать для js-файлов, но можно и для других
- `cssimport()` - я люблю создавать в src index.css, в который я импортирую все остальные css блоки. Для того, чтобы все эти блоки запихнуть в один файл, можно использовать плагин "gulp-cssimport"
- `include({include: '@@'})` - для html классно использовать плагин "gulp-file-include". Он позволяет создавать много независимых html-файлов и при сборке объединять его в один с помощью команды в html-коде (смотри пример)

```
@@include('./component.html')
```

P.S. необходимо следить за их обновлениями, потому что плагины любят деприкетить (забивать на них болт).


### 3. Минификация кода

Одно из важных вещей, который мы должны сделать - минифицировать код. То есть удалить все ненужные пробелы. 
Для этого я использую следующие плагины:

- `gulp-htmlmin` - для html
- `gulp-clean-css` - для css
- `gulp-uglify-es` - для js

Опять же нужно проверять: поддерживаются ли они при создание нового проекта.


### 4. Параллельное и последовательное выполнение задач

Иногда нам нужно выполнить несколько задача одновременно. Для этого в gulp есть

- `parallel` - выполнение задач параллельно
- `series` - выполнение задач последовательно

Прописывают при экспорте


### 5. Локальный сервер

Для разработки нам необходим локальный сервер, который бы отслеживал изменения кода и вносил бы вправки в основной код.

Для отслеживания кода в `gulp` есть `watch()`. В нем мы прописываем отслеживающие ф-лы и функцию, которая будет выполняться при изменение этих файлов. 

```js
watch(['src/**/*.html'], html);
```

Для создания локального хоста нам необходим плагин `browser-sync`.
Мы инициализируем его следующим образом и прописываем туда папку, с к-рой будут браться ф-лы

```js
function localhost() {
  browserSync.init({
    server: {
        baseDir: "dist/"
    }
  });
}
```

Чтобы понимать за какими ф-лами следить есть нужно прописать следующие `browserSync.stream()`

```js
function html() {
  return src('src/index.html')
    .pipe(include({
      include: '@@',
    }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}
```

И запустить задачи одновременно

```js
exports.dev = parallel(localhost, watching);
```


## Конец

В целом, это всё, что нужно знать о gulp. Тут данны базавые команды и плагины, которых в целом достаточно для разработки. В следующей главе расскажу про более продвинутые плагины для gulp, которые улучшают разработку.