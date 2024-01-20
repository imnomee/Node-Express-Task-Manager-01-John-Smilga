const express = require('express');
const router = express.Router();
const {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    delTask,
} = require('../controllers/tasksController');

router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getTask).patch(updateTask).delete(delTask);

module.exports = router;
