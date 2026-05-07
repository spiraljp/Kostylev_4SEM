const express = require('express');
const path = require('path');
const jobsRouter = require('./routes/jobs');
const jobsService = require('./services/jobsService');

const app = express();
const PORT = 3000;
const DATA_FILE_PATH = path.join(__dirname, 'data/jobs.json');

jobsService.init(DATA_FILE_PATH);

// Middleware
app.use(express.json());

// Логирование
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Подключение маршрутов
app.use('/jobs', jobsRouter);

// Обработка 404
app.use((req, res) => {
    res.status(404).json({ error: 'Маршрут не найден' });
});

// Глобальный error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

// Запуск
app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});
