# Лабораторная работа №6. Fetch, Promises и сборка проекта

## Постановка задачи

**Задача** — продолжить разработку frontend-приложения из лабораторной работы №5.

Необходимо заменить запросы через `XMLHttpRequest` на `fetch`, использовать `Promise` и `async/await`, собрать frontend через `bundler` и развернуть собранные файлы вместе с backend API из лабораторной работы №4.

В шестой лабораторной frontend должен обращаться к API с того же домена, с которого открыта страница. Благодаря этому проблема CORS решается без расширения браузера.

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


    LAB_6/
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
    ├── public/
    │   ├── assets/
    │   └── index.html
    ├── index.html
    ├── main.js
    ├── store.js
    ├── package.json
    ├── package-lock.json
    └── vite.config.js

В ветке шестой лабораторной папка проекта называется `LAB_5`, но по содержанию это лабораторная работа №6.

В проекте используется `Vite` для сборки frontend-приложения.

## Результат работы
<img width="1014" height="207" alt="image" src="https://github.com/user-attachments/assets/35020a72-09c1-46ef-92ba-fd7f89c3be48" />

### Главная страница

На главной странице отображаются карточки заданий, полученные с backend-сервера.

Данные загружаются с адреса:

    /jobs

Так как frontend развернут на backend-сервере, запрос выполняется на тот же домен.

<img width="1787" height="898" alt="image" src="https://github.com/user-attachments/assets/a2846029-9881-49bf-a605-d6c036c6b82c" />

### Замена XMLHttpRequest на fetch

В лабораторной работе №6 модуль `ajax.js` был переписан. Вместо `XMLHttpRequest` используется `fetch`.

Фрагмент кода:

    class Ajax {
        async get(url, callback) {
            await this._request(url, { method: 'GET' }, callback);
        }

        async post(url, data, callback) {
            await this._request(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            }, callback);
        }

        async patch(url, data, callback) {
            await this._request(url, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            }, callback);
        }

        async delete(url, callback) {
            await this._request(url, { method: 'DELETE' }, callback);
        }

        async _request(url, options, callback) {
            try {
                const response = await fetch(url, options);
                const text = await response.text();
                const data = text ? JSON.parse(text) : null;

                callback(data, response.status);
            } catch (error) {
                console.error('Ошибка запроса:', error);
                callback(null, 500);
            }
        }
    }

    export const ajax = new Ajax();


### Формирование URL запросов

В шестой лабораторной изменен файл `jobUrls.js`.

Теперь базовый адрес берется из `window.location.origin`, поэтому frontend обращается к API на том же адресе, с которого открыта страница.

Фрагмент кода:

    class JobUrls {
        constructor() {
            this.baseUrl = window.location.origin;
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

### Страница добавления и редактирования

В отличие от лабораторной работы №5, в шестой лабораторной на форме появилась кнопка **«Сохранить»**.

Если форма открыта без `id`, выполняется `POST /jobs` и создается новое задание.

Если форма открыта для существующей карточки, выполняется `PATCH /jobs/:id` и задание редактируется.

Фрагмент кода сохранения:

    saveJob(event) {
        event.preventDefault();

        const form = event.target;
        const jobData = this.getFormData(form);

        const callback = (data, status) => {
            if (status < 200 || status >= 300 || !data) {
                this.showMessage('Не удалось сохранить задание.');
                return;
            }

            this.showMessage('Задание сохранено.', 'success');

            setTimeout(() => {
                this.clickBack();
            }, 500);
        };

        if (this.id) {
            ajax.patch(jobUrls.updateJobById(this.id), jobData, callback);
        } else {
            ajax.post(jobUrls.createJob(), jobData, callback);
        }
    }

Форма сохранения задания:

<img width="1179" height="788" alt="image" src="https://github.com/user-attachments/assets/e93f7aba-5715-4c8d-acb6-3fa8bfed8449" />

### Сборка проекта

Для сборки проекта используется `Vite`.

Команда сборки:

    npm run build

## Запуск проекта

    cd LAB_6
    npm install
    npm run build


Затем нужно запустить backend из лабораторной работы №4:

    cd LAB_4
    npm install
    npm run dev

После запуска приложение будет доступно по адресу:

    http://localhost:3000

## Вывод

В ходе лабораторной работы были заменены запросы через `XMLHttpRequest` на `fetch`, использованы `Promise` и `async/await`.

Также была реализована возможность сохранения данных через формы добавления и редактирования. Frontend был собран с помощью `Vite` и развернут вместе с backend API из лабораторной работы №4.

Благодаря размещению frontend и backend на одном сервере запросы выполняются без ошибки CORS.
