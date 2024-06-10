# GULP

GULP - это потоковая система сборки. 

Или как его еще называют таск-ранер. То есть его задача заключается в том, чтобы автоматизировать 
бытовые прогерские задачи: сборка файлов в один файл, минификация, добавление префиксов итд.

## Установка 

### 1. Для начала установим gulp-cli глобально 
(Если уже устанавливал, то не нужно)

```
npm install --global gulp-cli
```

### 2. Создадим новый проект

```
npm init --yes
```

### 3. Установим gulp в проект как dev-зависимость

```
npm install --save-dev gulp
```

### 4. В корне проекта создадим gulpfile

Он и будет конфигом для бандлинга.

```
touch gulpfile.js
```

Далее начнем его заполнять (заходи в первый урок)