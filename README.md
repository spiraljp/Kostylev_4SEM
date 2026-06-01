# Лабораторная работа №4. REST API на Express.js

## Постановка задачи

Цель лабораторной работы — реализовать на `Node.js` собственный веб-сервис для API. Данные должны храниться в `json`-файле. Необходимо протестировать сервис через Postman или Insomnia и реализовать основные методы работы с карточками: получение списка, получение одной записи, добавление, редактирование и удаление.

Индивидуальная тема: **Grid-система планирования заданий**.

В рамках темы реализован API для работы с заданиями grid-системы.

## Выполнение

В ходе работы был разработан backend-сервис на `Express.js`. Сервер хранит данные о заданиях в файле `src/data/jobs.json`.

Каждая запись содержит следующие поля:

- `id` — уникальный идентификатор задания;
- `title` — название задания;
- `description` — описание задания;
- `priority` — приоритет задания;
- `status` — статус задания;
- `price` — стоимость выполнения задания.

Для разделения логики проект разбит на маршруты, контроллеры и сервисы:

- маршруты принимают HTTP-запросы;
- контроллеры обрабатывают параметры запроса и формируют ответ;
- сервисы выполняют работу с данными;
- отдельный файловый сервис отвечает за чтение и запись JSON-файла.

## Реализованные методы API

### Получение всех заданий

Метод:

    GET /jobs

Описание: возвращает список всех заданий из файла `jobs.json`.

Также поддерживается фильтрация по статусу:

    GET /jobs?status=pending

### Получение задания по ID

Метод:

    GET /jobs/:id

Описание: возвращает одно задание по его идентификатору. Если задание не найдено, сервер возвращает ошибку `404`.

### Создание нового задания

Метод:

    POST /jobs

Описание: создает новую запись в списке заданий. Данные передаются в теле запроса в формате JSON.

Пример тела запроса:

    {
      "title": "Задание 1",
      "description": "Вычисление",
      "priority": 6,
      "status": "pending",
      "price": 200
    }

Если обязательные поля не переданы, сервер возвращает ошибку `400`.

### Редактирование задания

Метод:

    PATCH /jobs/:id

Описание: изменяет данные существующего задания по ID. Если задание не найдено, сервер возвращает ошибку `404`.

Пример тела запроса:

    {
      "status": "completed",
      "priority": 3
    }

### Удаление задания

Метод:

    DELETE /jobs/:id

Описание: удаляет задание по ID. При успешном удалении сервер возвращает статус `204`.

### Дополнительный метод

Метод:

    DELETE /jobs/priority/high

Описание: удаляет задания с приоритетом выше `5`.

После выполнения запроса сервер возвращает количество удаленных заданий и список оставшихся записей.

## Структура проекта

![Структура проекта](readme_images/structure.png)

    LAB_4/
    ├── src/
    │   ├── controllers/
    │   │   └── jobsController.js
    │   ├── data/
    │   │   └── jobs.json
    │   ├── routes/
    │   │   └── jobs.js
    │   ├── services/
    │   │   ├── fileService.js
    │   │   └── jobsService.js
    │   └── index.js
    ├── package.json
    └── package-lock.json

## Описание основных файлов

`src/index.js` — точка входа в приложение. В файле создается Express-сервер, подключается обработка JSON, логирование запросов, маршруты `/jobs`, обработка ошибки `404` и запуск сервера на порту `3000`.

`src/routes/jobs.js` — файл маршрутов. Здесь описаны URL и HTTP-методы для работы с заданиями.

`src/controllers/jobsController.js` — контроллеры, которые принимают запросы, получают параметры, вызывают сервисы и отправляют HTTP-ответ.

`src/services/jobsService.js` — сервис для работы с заданиями. Реализует поиск, создание, обновление и удаление записей.

`src/services/fileService.js` — сервис для чтения и записи данных в JSON-файл.

`src/data/jobs.json` — файл с данными о заданиях grid-системы.

`package.json` — файл с описанием проекта, зависимостями и командами запуска.

## Фрагменты реализации

Подключение маршрутов в `src/index.js`:

    const express = require('express');
    const path = require('path');
    const jobsRouter = require('./routes/jobs');
    const jobsService = require('./services/jobsService');

    const app = express();
    const PORT = 3000;
    const DATA_FILE_PATH = path.join(__dirname, 'data/jobs.json');

    jobsService.init(DATA_FILE_PATH);

    app.use(express.json());

    app.use((req, res, next) => {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
        next();
    });

    app.use('/jobs', jobsRouter);

    app.use((req, res) => {
        res.status(404).json({ error: 'Маршрут не найден' });
    });

    app.listen(PORT, () => {
        console.log(`Сервер запущен: http://localhost:${PORT}`);
    });

Описание маршрутов в `src/routes/jobs.js`:

    const express = require('express');
    const router = express.Router();
    const jobsController = require('../controllers/jobsController');

    router.get('/', jobsController.getAllJobs);
    router.get('/:id', jobsController.getJobById);
    router.post('/', jobsController.createJob);
    router.patch('/:id', jobsController.updateJob);
    router.delete('/:id', jobsController.deleteJob);
    router.delete('/priority/high', jobsController.deleteJobsByHighPriority);

    module.exports = router;

Создание нового задания в `jobsController.js`:

    const createJob = (req, res) => {
        const { title, description, priority, status, price } = req.body;

        if (!title || !description || priority === undefined || !status) {
            return res.status(400).json({
                error: 'Все поля (title, description, priority, status, price) обязательны'
            });
        }

        const newJob = jobsService.create({
            title,
            description,
            priority,
            status,
            price
        });

        res.status(201).json(newJob);
    };

Добавление записи в `jobsService.js`:

    const create = (jobData) => {
        const jobs = fileService.readData(dataFilePath);
        const newId = jobs.length > 0 ? Math.max(...jobs.map(j => j.id)) + 1 : 1;
        const newJob = { id: newId, ...jobData };

        jobs.push(newJob);
        fileService.writeData(dataFilePath, jobs);

        return newJob;
    };

## Результат работы

Запуск сервера:

![Запуск сервера](readme_images/server.png)

Получение всех заданий:

![GET all](readme_images/get_all.png)

Получение задания по ID:

![GET one](readme_images/get_one.png)

Создание нового задания:

![POST](readme_images/post.png)

Редактирование задания:

![PATCH](readme_images/patch.png)

Удаление задания:

![DELETE](readme_images/delete.png)

Фильтрация заданий по статусу:

![Фильтрация](readme_images/filter.png)

Дополнительный метод удаления заданий с высоким приоритетом:

![Удаление по приоритету](readme_images/delete_priority.png)

## Запуск проекта

Для запуска проекта необходимо перейти в папку `LAB_4` и установить зависимости:

    cd LAB_4
    npm install

Запуск сервера:

    npm run dev

Или обычный запуск через Node.js:

    npm start

После запуска сервер доступен по адресу:

    http://localhost:3000

## .gitignore

Для данной лабораторной работы используется `.gitignore`, который исключает зависимости, логи, локальные файлы окружения и настройки редакторов:

    node_modules/
    logs/
    *.log
    npm-debug.log*
    .env
    .env.*
    .postman/
    postman/
    .DS_Store
    Thumbs.db
    .vscode/
    .idea/

## Вывод

В ходе лабораторной работы был реализован REST API на `Express.js` для работы с заданиями grid-системы. Были изучены маршруты, контроллеры, сервисы, хранение данных в JSON-файле, обработка HTTP-методов и кодов состояния.

Сервис был протестирован через Postman: проверены получение списка записей, получение записи по ID, создание, редактирование, удаление и дополнительный метод удаления заданий с высоким приоритетом.
