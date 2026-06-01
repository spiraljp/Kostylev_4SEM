# Лабораторная работа №5. AJAX и XMLHttpRequest

## Постановка задачи

**Задача** — продолжить разработку frontend-приложения из лабораторной работы №3 и подключить его к API, реализованному в лабораторной работе №4.

Необходимо реализовать получение данных с backend-сервера с помощью `XMLHttpRequest`, добавить страницу добавления/редактирования карточки и соответствующие кнопки.

Код backend из лабораторной работы №4 в ветку пятой лабораторной добавлять не нужно. В пятой лабораторной остается только frontend.

## Тема

**Grid-система планирования заданий**

В рамках выбранной темы приложение отображает карточки заданий grid-системы. Данные о заданиях загружаются с backend-сервера.

Карточка задания содержит поля:

- `id` — идентификатор задания;
- `title` — название задания;
- `description` — описание задания;
- `priority` — приоритет задания;
- `status` — статус задания;
- `price` — стоимость выполнения задания.

## Структура проекта


    LAB_5/
    ├── components/
    │   ├── back-button/
    │   │   └── index.js
    │   ├── button-group/
    │   │   └── index.js
    │   ├── filter/
    │   │   └── index.js
    │   ├── product-card/
    │   │   └── index.js
    │   ├── product/
    │   │   └── index.js
    │   └── three-viewer/
    │       └── index.js
    ├── models/
    │   └── server.glb
    ├── modules/
    │   ├── ajax.js
    │   └── jobUrls.js
    ├── pages/
    │   ├── job-form/
    │   │   └── index.js
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

В проекте используется компонентный подход.

Файл `main.js` является точкой входа в приложение.

Файл `pages/main/index.js` отвечает за главную страницу, загрузку данных с API, фильтрацию и отображение карточек.

Файл `pages/job-form/index.js` отвечает за страницу добавления и редактирования задания.

Файл `modules/ajax.js` содержит реализацию запросов через `XMLHttpRequest`.

Файл `modules/jobUrls.js` формирует URL для обращения к backend-серверу.

## Результат работы

### Главная страница

На главной странице отображаются карточки заданий, полученные с backend-сервера из лабораторной работы №4.

Данные загружаются с адреса:

    http://localhost:3000/jobs

<img width="1812" height="1001" alt="image" src="https://github.com/user-attachments/assets/6b292c5f-b9a0-475f-a19e-feb63e6cbfcf" />

### Получение данных через XMLHttpRequest

Для получения данных реализован отдельный модуль `ajax.js`.

Фрагмент кода:

    class Ajax {
        get(url, callback) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.send();

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    this._handleResponse(xhr, callback);
                }
            };
        }

        _handleResponse(xhr, callback) {
            try {
                const data = xhr.responseText ? JSON.parse(xhr.responseText) : null;
                callback(data, xhr.status);
            } catch (error) {
                console.error('Ошибка парсинга JSON:', error);
                callback(null, xhr.status);
            }
        }
    }

    export const ajax = new Ajax();


### Фильтрация карточек

В приложении реализована фильтрация заданий по названию.

Пользователь вводит текст в поле фильтрации, после чего приложение отображает только подходящие карточки.

Фрагмент фильтрации:

    filterByTitle(items) {
        if (!this.currentTitle) {
            return items;
        }

        const title = this.currentTitle.toLowerCase();
        return items.filter((item) => item.title.toLowerCase().includes(title));
    }

Результат фильтрации:

<img width="1784" height="946" alt="image" src="https://github.com/user-attachments/assets/98e8a436-6bfb-46e0-a901-f2182e05ab1f" />

### Формирование URL запросов

Для формирования адресов запросов используется файл `jobUrls.js`.

Фрагмент кода:

    class JobUrls {
        constructor() {
            this.baseUrl = 'http://localhost:3000';
        }

        getJobs(title = '') {
            const url = new URL(`${this.baseUrl}/jobs`);

            if (title) {
                url.searchParams.set('title', title);
            }

            return url.toString();
        }

        getJobById(id) {
            return `${this.baseUrl}/jobs/${id}`;
        }

        createJob() {
            return `${this.baseUrl}/jobs`;
        }

        updateJobById(id) {
            return `${this.baseUrl}/jobs/${id}`;
        }

        removeJobById(id) {
            return `${this.baseUrl}/jobs/${id}`;
        }
    }

    export const jobUrls = new JobUrls();

### Страница добавления задания

На главной странице добавлена кнопка **«+ Добавить задание»**.

При нажатии открывается страница с формой, в которую можно ввести данные нового задания.

<img width="1245" height="775" alt="image" src="https://github.com/user-attachments/assets/3dd46526-cd87-40b6-8fd8-739717612fd8" />

### Страница редактирования задания

При нажатии на карточку открывается страница редактирования выбранного задания. Для существующей карточки данные загружаются с API по ID.

Фрагмент кода загрузки задания:

    getData() {
        const formRoot = document.getElementById('job-form-content');
        formRoot.innerHTML = '<div class="alert alert-secondary">Загрузка задания...</div>';

        ajax.get(jobUrls.getJobById(this.id), (data, status) => {
            if (status < 200 || status >= 300 || !data) {
                formRoot.innerHTML = '<div class="alert alert-danger">Не удалось загрузить задание из API.</div>';
                return;
            }

            this.renderForm(data);
        });
    }

Форма редактирования:

<img width="1697" height="811" alt="image" src="https://github.com/user-attachments/assets/0401def5-2815-4f9f-b8bb-63f8f0a6fd32" />


## Запуск проекта

Для работы пятой лабораторной необходимо одновременно запустить backend из лабораторной работы №4 и frontend из лабораторной работы №5.

### Запуск backend

Перейти в папку `LAB_4` и выполнить:

    npm install
    npm run dev

Backend будет доступен по адресу:

    http://localhost:3000

### Запуск frontend

Перейти в папку `LAB_5` и установить зависимости:

    npm install

После этого открыть `index.html` через Live Server.

## Вывод

В ходе лабораторной работы был подключен frontend из лабораторной работы №3 к backend API из лабораторной работы №4.

Была реализована загрузка карточек заданий с сервера с помощью `XMLHttpRequest`, добавлена фильтрация, создан отдельный модуль для AJAX-запросов и модуль для формирования URL.

Также была добавлена страница добавления и редактирования задания. В рамках пятой лабораторной данные на этой странице можно просматривать и вводить, а сохранение реализуется в следующей лабораторной работе.

Работа запросов была проверена через вкладку `Network` с фильтром `XHR`.
