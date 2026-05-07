const jobsService = require('../services/jobsService');

const getAllJobs = (req, res) => {
    const { status } = req.query;
    const jobs = jobsService.findAll(status);
    res.json(jobs);
};

const getJobById = (req, res) => {
    const id = parseInt(req.params.id);
    const job = jobsService.findOne(id);
    if (!job) {
        return res.status(404).json({ error: 'Задание не найдено' });
    }
    res.json(job);
};

const createJob = (req, res) => {
    const { title, description, priority, status } = req.body;

    if (!title || !description || priority === undefined || !status) {
        return res.status(400).json({ error: 'Все поля (title, description, priority, status) обязательны' });
    }

    const newJob = jobsService.create({ title, description, priority, status });
    res.status(201).json(newJob);
};

const updateJob = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedJob = jobsService.update(id, req.body);
    if (!updatedJob) {
        return res.status(404).json({ error: 'Задание не найдено' });
    }
    res.json(updatedJob);
};

const deleteJob = (req, res) => {
    const id = parseInt(req.params.id);
    const success = jobsService.remove(id);
    if (!success) {
        return res.status(404).json({ error: 'Задание не найдено' });
    }
    res.status(204).send();
};

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
module.exports = { getAllJobs, getJobById, createJob, updateJob, deleteJob, deleteJobsByHighPriority};
