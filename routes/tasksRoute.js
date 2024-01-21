const express = require('express');
const router = express.Router();
const {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    delTask,
    // editTask,
} = require('../controllers/tasksController');

router.route('/').get(getAllTasks).post(createTask);
//path updates the fields provided for the update and leaves the rest as it is
// put will add the fields provided and rewrite the whole document removing the properies not provided
router.route('/:id').get(getTask).patch(updateTask).delete(delTask);
// .put(editTask);

module.exports = router;
