const TaskModel = require('../dbModels/TaskModel');

const getAllTasks = async (req, res) => {
    try {
        const allTasks = await TaskModel.find({});
        // return res.status(200).json(allTasks);
        // return res.status(200).json({
        //     success: true,
        //     data: {
        //         nbHits: allTasks.length, //nbHits: Number of Hits
        //         allTasks,
        //     },
        // });
        return res.status(200).json({
            status: 'success',
            data: {
                nbHits: allTasks.length, //nbHits: Number of Hits
                allTasks,
            },
        });
    } catch (err) {
        return res.status(500).json({ message: 'Error Retreiving Tasks' });
    }
};

const createTask = async (req, res) => {
    try {
        const task = await TaskModel.create(req.body);
        return res.status(201).json(task);
    } catch (err) {
        return res.status(500).json({ message: 'Server Error' });
    }
};

const getTask = async (req, res) => {
    try {
        const taskID = req.params.id;
        const task = await TaskModel.findOne({
            _id: taskID,
        });
        if (!task) {
            //we will get this error if the ID format is correct but the ID is not avaialble
            //if the id syntax is right but we cannot find the data, throw this error
            return res.status(404).json({ msg: `No task with id: ${taskID}` });
        }
        return res.status(200).json({ task });
    } catch (err) {
        // we will get this error if the ID is correct but the server isn't connecting or the ID format is incorrect
        return res.status(500).json(err);
    }
};

const delTask = async (req, res) => {
    try {
        const taskID = req.params.id;
        const task = await TaskModel.findOneAndDelete({ _id: taskID });
        if (!task) {
            return res
                .status(404)
                .json({ message: `No task with that ${taskID}` });
        }
        return res.status(200).json({ task });
        // return res.status(200).send();
        // return res.status(200).json({ task: null, status: 'success' });
    } catch (err) {
        return res.status(500).json(err);
    }
};

const updateTask = async (req, res) => {
    try {
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
            return res
                .status(404)
                .json({ message: `No task with that ${taskID}` });
        }

        return res.status(200).json({ id: taskID, data: req.body });
    } catch (err) {
        return res.status(500).json(err);
    }
};

// const editTask = async (req, res) => {
//     try {
//         const taskID = req.params.id;
//         //for findOneand Update we will need id to filter and data to update
//         const task = await TaskModel.findOneAndUpdate(
//             { _id: taskID }, //taskID
//             //data to update aka Old data
//             req.body,
//             {
//                 new: true,
//                 runValidators: true,
//                 overwrite: true,
//             }
//         );

//         if (!task) {
//             return res
//                 .status(404)
//                 .json({ message: `No task with that ${taskID}` });
//         }

//         return res.status(200).json({ id: taskID, data: req.body });
//     } catch (err) {
//         return res.status(500).json(err);
//     }
// };

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    delTask,
    // editTask,
};
