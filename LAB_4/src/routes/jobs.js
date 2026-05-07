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
