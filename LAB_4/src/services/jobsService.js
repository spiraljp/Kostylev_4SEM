const fileService = require('./fileService');

let dataFilePath;

const init = (filePath) => {
    dataFilePath = filePath;
};
const findAll = (status) => {
    const jobs = fileService.readData(dataFilePath);
    if (status) {
        return jobs.filter(job => job.status.toLowerCase() === status.toLowerCase());
    }
    return jobs;
};

const findOne = (id) => {
    const jobs = fileService.readData(dataFilePath);
    return jobs.find(job => job.id === id);
};

const create = (jobData) => {
    const jobs = fileService.readData(dataFilePath);
    const newId = jobs.length > 0 ? Math.max(...jobs.map(j => j.id)) + 1 : 1;
    const newJob = { id: newId, ...jobData };
    jobs.push(newJob);
    fileService.writeData(dataFilePath, jobs);
    return newJob;
};

const update = (id, jobData) => {
    const jobs = fileService.readData(dataFilePath);
    const index = jobs.findIndex(j => j.id === id);
    if (index === -1) return null;

    jobs[index] = { ...jobs[index], ...jobData };
    fileService.writeData(dataFilePath, jobs);
    return jobs[index];
};

const remove = (id) => {
    const jobs = fileService.readData(dataFilePath);
    const filtered = jobs.filter(j => j.id !== id);
    if (filtered.length === jobs.length) return false;
    fileService.writeData(dataFilePath, filtered);
    return true;
};

const removeByPriorityGreaterThan = (threshold) => {
    const jobs = fileService.readData(dataFilePath);
    const filteredJobs = jobs.filter(job => job.priority <= threshold);
    const removedCount = jobs.length - filteredJobs.length;

    if (removedCount === 0) return false;

    fileService.writeData(dataFilePath, filteredJobs);
    return { removedCount, remainingJobs: filteredJobs };
};
module.exports = { init, findAll, findOne, create, update, remove, removeByPriorityGreaterThan};
