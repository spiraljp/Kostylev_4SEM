# Лабораторная работа №3 и домашнее задание

## Постановка задачи

Цель лабораторной работы №3 — знакомство с Node.js, npm и созданием простого JavaScript-приложения с карточками. Необходимо реализовать страницу списка карточек, фильтрацию, просмотр подробной информации и работу с mock-данными.

Цель домашнего задания — реализовать задания по варианту с использованием коллекций, функций, объектов и строк, а также добавить отображение 3D-модели с помощью библиотеки `three.js`.

Индивидуальная тема: **Grid-система планирования заданий**.

## Выполнение лабораторной работы №3

Разработано веб-приложение для отображения вычислительных узлов grid-системы. На главной странице выводятся карточки узлов с характеристиками: производительность, процессор, оперативная память, хранилище, загрузка и доступность.

Реализованы:

- главная страница со списком карточек;
- фильтрация вычислительных узлов по уровню производительности;
- карусель карточек;
- добавление нового вычислительного узла;
- страница подробной информации;
- переход на страницу домашнего задания;
- подключение библиотек `bootstrap` и `three`.

Данные о вычислительных узлах хранятся в `store.js`. Для отображения интерфейса используются отдельные компоненты и страницы.

## Выполнение домашнего задания

Домашнее задание состоит из двух частей.

В первой части реализованы функции для работы с массивами, объектами, матрицами и строками. В папке `DZ` находятся файлы:

- `tasks.js` — реализация функций;
- `run.js` — консольное меню для запуска заданий.

Реализованы функции:

- `sumOfSquares(arr)` — вычисляет сумму квадратов чисел массива;
- `isEqualObj(obj1, obj2)` — сравнивает два объекта;
- `diagonalSum(matrix)` — вычисляет сумму главной и побочной диагоналей матрицы;
- `groupAnagrams(words)` — группирует слова-анаграммы.

Во второй части домашнее задание встроено в приложение лабораторной №3. На странице `TasksPage` реализованы:

- расчет суммы диагоналей матрицы загрузки вычислительных узлов;
- группировка названий заданий-анаграмм;
- отображение 3D-модели вычислительного узла с помощью `three.js`.

Для 3D-визуализации используется компонент `ThreeViewer`, который загружает модель `server.glb`.

## Структура проекта

![Структура проекта](readme_images/structure.png)

    LAB_3/
    ├── components/
    │   ├── back-button/
    │   │   └── index.js
    │   ├── button-group/
    │   │   └── index.js
    │   ├── product-card/
    │   │   └── index.js
    │   ├── product/
    │   │   └── index.js
    │   └── three-viewer/
    │       └── index.js
    ├── models/
    │   └── server.glb
    ├── pages/
    │   ├── main/
    │   │   └── index.js
    │   ├── product/
    │   │   └── index.js
    │   └── tasks/
    │       └── index.js
    ├── index.html
    ├── main.js
    ├── store.js
    ├── package.json
    └── package-lock.json

    DZ/
    ├── run.js
    └── tasks.js

## Описание основных файлов

`index.html` — основной HTML-файл приложения, в котором находится корневой элемент для рендера страниц.

`main.js` — точка входа в приложение. Создает главную страницу и запускает ее отрисовку.

`store.js` — хранилище mock-данных о вычислительных узлах.

`pages/main/index.js` — главная страница приложения. Отвечает за вывод карточек, фильтрацию, карусель и добавление нового узла.

`pages/product/index.js` — страница подробной информации о выбранном вычислительном узле.

`pages/tasks/index.js` — страница домашнего задания. Содержит расчет суммы диагоналей, группировку анаграмм и вывод 3D-модели.

`components/product-card/index.js` — компонент карточки вычислительного узла.

`components/product/index.js` — компонент подробного отображения вычислительного узла.

`components/button-group/index.js` — компонент кнопок фильтрации.

`components/back-button/index.js` — компонент кнопки возврата назад.

`components/three-viewer/index.js` — компонент для отображения 3D-модели через `three.js`.

`DZ/tasks.js` — файл с функциями домашнего задания.

`DZ/run.js` — консольный запуск домашнего задания через меню.

## Фрагменты реализации

Пример добавления нового вычислительного узла:

    generateNewNode() {
        const newId = nodeStore.getNextId();
        const performance = Math.floor(Math.random() * 100) + 1;
        let performanceLevel = 'low';

        if (performance >= 80) performanceLevel = 'high';
        else if (performance >= 50) performanceLevel = 'medium';

        const cpus = [
            "Intel Xeon Gold 6248", "AMD EPYC 7302",
            "Intel Xeon Silver 4214", "AMD EPYC 7402",
            "Intel Xeon Platinum 8280", "AMD EPYC 7742"
        ];

        return {
            id: newId,
            performance,
            performanceLevel,
            cpu: cpus[Math.floor(Math.random() * cpus.length)],
            ram: Math.floor(Math.random() * 200) + 16,
            storage: Math.floor(Math.random() * 4000) + 500,
            load: Math.floor(Math.random() * 100),
            available: Math.random() > 0.3
        };
    }

Функция расчета суммы диагоналей матрицы:

    function diagonalSum(matrix) {
        if (!Array.isArray(matrix) || matrix.length === 0) return 0;

        const n = matrix.length;

        for (let i = 0; i < n; i++) {
            if (!Array.isArray(matrix[i]) || matrix[i].length !== n) return 0;
        }

        let total = 0;

        for (let i = 0; i < n; i++) {
            total += matrix[i][i];
            total += matrix[i][n - 1 - i];
        }

        if (n % 2 === 1) {
            const mid = Math.floor(n / 2);
            total -= matrix[mid][mid];
        }

        return total;
    }

Функция группировки анаграмм:

    function groupAnagrams(words) {
        if (!Array.isArray(words)) return [];

        const map = new Map();

        for (const word of words) {
            const key = word.toLowerCase().split('').sort().join('');

            if (!map.has(key)) map.set(key, []);
            map.get(key).push(word);
        }

        let groups = Array.from(map.values()).filter(group => group.length > 1);
        groups = groups.map(group => group.sort());
        groups.sort((a, b) => a[0].localeCompare(b[0]));

        return groups;
    }

Подключение 3D-модели:

    const threeContainer = document.getElementById('three-container');

    if (threeContainer) {
        this.threeViewer = new ThreeViewer(threeContainer, 'models/server.glb');
        window.addEventListener('resize', () => this.threeViewer?.resize());
    }

## Результат работы

Главная страница приложения с карточками вычислительных узлов:

![Главная страница](readme_images/main.png)

Фильтрация вычислительных узлов по производительности:

![Фильтрация](readme_images/filter.png)

Страница подробной информации о вычислительном узле:

![Подробная информация](readme_images/details.png)

Страница домашнего задания:

![Страница домашнего задания](readme_images/tasks.png)

Расчет суммы диагоналей матрицы:

![Сумма диагоналей](readme_images/diagonal.png)

Группировка анаграмм:

![Анаграммы](readme_images/anagrams.png)

Отображение 3D-модели вычислительного узла:

![3D-модель](readme_images/three_model.png)

Запуск консольной части домашнего задания:

![Консольное ДЗ](readme_images/console.png)

## Запуск проекта

Для установки зависимостей необходимо выполнить команду:

    npm install

После установки зависимостей приложение можно открыть через Live Server.

Для запуска консольной части домашнего задания необходимо перейти в папку `DZ` и выполнить команду:

    node run.js

## Вывод

В ходе лабораторной работы №3 было разработано простое JavaScript-приложение с карточками вычислительных узлов, фильтрацией, каруселью, страницей подробной информации и компонентной структурой проекта.

В ходе выполнения домашнего задания были реализованы функции для работы с массивами, объектами, матрицами и строками, а также добавлена 3D-визуализация вычислительного узла с помощью библиотеки `three.js`.
