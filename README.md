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

## Где посмотреть домашнее задание

Домашнее задание можно посмотреть прямо в приложении `LAB_3`.

Для этого нужно запустить лабораторную работу №3, открыть главную страницу приложения и нажать кнопку **«Домашка»**. После этого откроется отдельная страница домашнего задания, где реализованы:

- расчет суммы диагоналей матрицы загрузки вычислительных узлов;
- группировка названий заданий-анаграмм;
- отображение 3D-модели вычислительного узла.

Также консольная версия домашнего задания находится в отдельной папке `DZ`.

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

`pages/tasks/index.js` — страница домашнего задания. Именно эта страница открывается по кнопке **«Домашка»** из приложения `LAB_3`.

`components/product-card/index.js` — компонент карточки вычислительного узла.

`components/product/index.js` — компонент подробного отображения вычислительного узла.

`components/button-group/index.js` — компонент кнопок фильтрации.

`components/back-button/index.js` — компонент кнопки возврата назад.

`components/three-viewer/index.js` — компонент для отображения 3D-модели через `three.js`.

`DZ/tasks.js` — файл с функциями домашнего задания.

`DZ/run.js` — консольный запуск домашнего задания через меню.

## Фрагменты реализации

Пример перехода на страницу домашнего задания из `LAB_3`:

    goToTasks() {
        const tasksPage = new TasksPage(this.parent);
        tasksPage.render();
    }

    document.getElementById('tasks-button')?.addEventListener('click', this.goToTasks.bind(this));

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

<img width="1837" height="1023" alt="image" src="https://github.com/user-attachments/assets/dc0cee0f-fc30-4f12-8591-a5793d54d79e" />

Фильтрация вычислительных узлов по производительности:

<img width="1834" height="1016" alt="image" src="https://github.com/user-attachments/assets/94b03256-6014-40cb-86d8-f2936522e785" />

Страница подробной информации о вычислительном узле:

<img width="1821" height="712" alt="image" src="https://github.com/user-attachments/assets/69483a83-3f0e-4272-9f12-403c12a2f3a9" />

Страница домашнего задания, открытая из `LAB_3` по кнопке **«Домашка»**:

<img width="1822" height="1011" alt="image" src="https://github.com/user-attachments/assets/772f32c9-b5f7-4e7b-982a-77bf0125a24b" />

Расчет суммы диагоналей матрицы:

<img width="782" height="353" alt="image" src="https://github.com/user-attachments/assets/5e02f963-d2b3-420b-919d-b3a2e52909c3" />

Группировка анаграмм:

<img width="792" height="606" alt="image" src="https://github.com/user-attachments/assets/559528f2-98f8-4eda-9ccd-997d956ff3d9" />

Отображение 3D-модели вычислительного узла:

<img width="1645" height="641" alt="image" src="https://github.com/user-attachments/assets/73346ec2-fb26-4f15-9616-d0cc5d10425b" />

Запуск консольной части домашнего задания:

<img width="569" height="527" alt="image" src="https://github.com/user-attachments/assets/33ffd400-839b-417e-aba7-f58fbed3ff90" />

<img width="389" height="510" alt="image" src="https://github.com/user-attachments/assets/2ed66d5e-7070-4081-a4bd-68385a121f8a" />

## Запуск проекта

Для запуска лабораторной работы №3 необходимо перейти в папку `LAB_3` и установить зависимости:

    cd LAB_3
    npm install

После установки зависимостей нужно открыть файл `index.html` через Live Server.

Домашнее задание в браузере открывается из приложения `LAB_3`: на главной странице нужно нажать кнопку **«Домашка»**.

Для запуска консольной части домашнего задания необходимо перейти в папку `DZ` и выполнить команду:

    cd DZ
    node run.js

## Вывод

В ходе лабораторной работы №3 было разработано простое JavaScript-приложение с карточками вычислительных узлов, фильтрацией, каруселью, страницей подробной информации и компонентной структурой проекта.

Домашнее задание было встроено в приложение `LAB_3`: его можно открыть с главной страницы по кнопке **«Домашка»**. Также была реализована отдельная консольная версия в папке `DZ`.

В ходе выполнения домашнего задания были реализованы функции для работы с массивами, объектами, матрицами и строками, а также добавлена 3D-визуализация вычислительного узла с помощью библиотеки `three.js`.
