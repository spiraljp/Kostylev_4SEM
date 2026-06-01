# Лабораторная работа №4. Создание бэкенда на Express.js

## Постановка задачи

**Задача** — разработать REST API сервис для карточек заданий grid-системы. Данные должны храниться в `json`-файле.

Необходимо реализовать методы:

- `GET /jobs` — получение всех карточек заданий;
- `GET /jobs/:id` — получение карточки задания по ID;
- `POST /jobs` — создание новой карточки задания;
- `PATCH /jobs/:id` — обновление карточки задания по ID;
- `DELETE /jobs/:id` — удаление карточки задания по ID.

Также необходимо протестировать работу сервиса через Postman или Insomnia.

## Тема

**Grid-система планирования заданий**

В рамках выбранной темы карточка описывает задание, которое может быть отправлено на выполнение в grid-систему.

Карточка задания содержит поля:

- `id` — идентификатор задания;
- `title` — название задания;
- `description` — описание задания;
- `priority` — приоритет задания;
- `status` — статус задания;
- `price` — стоимость выполнения задания.

## Структура проекта


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

В проекте используется разделение на маршруты, контроллеры и сервисы.

Файл `src/index.js` отвечает за создание сервера, подключение middleware, маршрутов и запуск приложения.

Файл `src/routes/jobs.js` содержит маршруты API:

    router.get('/', jobsController.getAllJobs);
    router.get('/:id', jobsController.getJobById);
    router.post('/', jobsController.createJob);
    router.patch('/:id', jobsController.updateJob);
    router.delete('/:id', jobsController.deleteJob);
    router.delete('/priority/high', jobsController.deleteJobsByHighPriority);

Файл `src/controllers/jobsController.js` обрабатывает запросы и формирует ответы.

Файл `src/services/jobsService.js` содержит основную логику работы с заданиями.

Файл `src/services/fileService.js` отвечает за чтение и запись данных в `json`-файл.

## Результат работы

### GET /jobs — получение всех карточек

Метод возвращает список всех заданий из файла `jobs.json`.

<img width="1266" height="1025" alt="image" src="https://github.com/user-attachments/assets/fa7ed0b8-c1a7-4030-8d61-7fc8e21060e6" />

### GET /jobs/:id — получение карточки по ID

Метод возвращает одно задание по его идентификатору.

Если задание не найдено, возвращается ошибка `404`.

<img width="1202" height="298" alt="image" src="https://github.com/user-attachments/assets/15b5bad9-bc74-409d-a8a1-a2af3be7d6dd" />

### POST /jobs — создание новой карточки

Метод создает новую карточку задания.

Пример тела запроса:

    {
      "title": "Задание 1",
      "description": "Вычисление",
      "priority": 6,
      "status": "pending",
      "price": 200
    }

Если обязательные поля не переданы, сервер возвращает ошибку `400`.

<img width="1212" height="986" alt="image" src="https://github.com/user-attachments/assets/7e516219-0e57-437f-91dd-3d2af13e2e06" />

### PATCH /jobs/:id — обновление карточки

Метод обновляет данные существующего задания по ID.

Пример тела запроса:

    {
      "status": "completed",
      "priority": 3
    }

Если задание не найдено, возвращается ошибка `404`.

<img width="1217" height="594" alt="image" src="https://github.com/user-attachments/assets/1ac4d993-7da4-414b-818c-2994584e5149" />

### DELETE /jobs/:id — удаление карточки

Метод удаляет задание по ID.

При успешном удалении сервер возвращает статус `204`.

<img width="1197" height="598" alt="image" src="https://github.com/user-attachments/assets/a946bb66-a87a-4d5f-89b0-8f6bb4857587" />

### GET /jobs?status=pending — фильтрация по статусу

Также реализована фильтрация заданий по статусу.

Например, запрос:

    GET /jobs?status=pending

возвращает только задания со статусом `pending`.

<img width="1213" height="962" alt="image" src="https://github.com/user-attachments/assets/1ec0c369-ec58-4085-8b59-fc7d527d0e57" />

## Дополнительное задание

Дополнительно был реализован метод удаления заданий с высоким приоритетом:

    DELETE /jobs/priority/high

Метод удаляет все задания, у которых значение `priority` больше `5`.

Фрагмент реализации:

    const deleteJobsByHighPriority = (req, res) => {
        const threshold = 5;
        const result = jobsService.removeByPriorityGreaterThan(threshold);

        if (!result) {
            return res.status(404).json({
                message: `Нет заданий с приоритетом больше ${threshold}`
            });
        }

        res.json({
            message: `Удалено заданий: ${result.removedCount}`,
            remaining: result.remainingJobs
        });
    };

Функция в сервисе читает данные из файла, фильтрует задания и записывает обновленный список обратно в `jobs.json`.

    const removeByPriorityGreaterThan = (threshold) => {
        const jobs = fileService.readData(dataFilePath);
        const filteredJobs = jobs.filter(job => job.priority <= threshold);
        const removedCount = jobs.length - filteredJobs.length;

        if (removedCount === 0) return null;

        fileService.writeData(dataFilePath, filteredJobs);

        return {
            removedCount,
            remainingJobs: filteredJobs
        };
    };

Результат работы дополнительного метода:

<img width="1217" height="507" alt="image" src="https://github.com/user-attachments/assets/0bc4d25e-96e2-4aa0-ab62-8b186c5af927" />

## Запуск сервера

Для запуска проекта необходимо перейти в папку `LAB_4` и установить зависимости:

    cd LAB_4
    npm install

Запуск сервера в режиме разработки:

    npm run dev

Обычный запуск сервера:

    npm start

После запуска сервер доступен по адресу:

    http://localhost:3000

Пример запуска сервера:

<img width="605" height="393" alt="image" src="https://github.com/user-attachments/assets/4c7b6b0b-6172-46a7-9cb5-f88564272938" />

## Вывод

В ходе лабораторной работы был разработан REST API сервис на `Express.js` для работы с карточками заданий grid-системы.

Были реализованы методы получения списка заданий, получения задания по ID, создания, редактирования и удаления. Данные сохраняются в `json`-файле.

Также был реализован дополнительный метод удаления заданий с высоким приоритетом. Работа всех методов была проверена через Postman.
