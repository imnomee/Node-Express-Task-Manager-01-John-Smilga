const TaskModel = require('../dbModels/TaskModel');
const asyncWrapper = require('../middlewares/async');

const getAllTasks = asyncWrapper(async (req, res, next) => {
    const allTasks = await TaskModel.find();
    return res.status(200).json({
        status: 'success',
        data: {
            nbHits: allTasks.length, //nbHits: Number of Hits
            allTasks,
        },
    });
});

const createTask = asyncWrapper(async (req, res) => {
    const task = await TaskModel.create(req.body);
    return res.status(201).json({
        status: 'success',
        data: {
            task,
        },
    });
});

const getTask = asyncWrapper(async (req, res, next) => {
    const taskID = req.params.id;
    const task = await TaskModel.findOne({
        _id: taskID,
    });
    if (!task) {
        const error = new Error('Not Found');
        error.status = 404;
        return next(error);
        //we will get this error if the ID format is correct but the ID is not avaialble
        //if the id syntax is right but we cannot find the data, throw this error
        return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    return res.status(201).json({
        status: 'success',
        data: {
            task,
        },
    });
});

const delTask = asyncWrapper(async (req, res) => {
    const taskID = req.params.id;
    const task = await TaskModel.findOneAndDelete({ _id: taskID });
    if (!task) {
        return res.status(404).json({ message: `No task with that ${taskID}` });
    }
    return res.status(200).json({
        status: 'success',
        data: null,
    });
});

const updateTask = asyncWrapper(async (req, res) => {
    const taskID = req.params.id;
    //for findOneand Update we will need id to filter and data to update
    const task = await TaskModel.findOneAndUpdate(
        { _id: taskID }, //taskID
        //data to update aka Old data
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );

    if (!task) {
        return res.status(404).json({ message: `No task with that ${taskID}` });
    }

    return res.status(200).json({
        status: 'success',
        data: {
            task,
        },
    });
});

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    delTask,
    // editTask,
};
