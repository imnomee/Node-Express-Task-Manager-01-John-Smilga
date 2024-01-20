const getAllTasks = (req, res) => {
    res.send('return all items from the file');
};

const createTask = (req, res) => {
    res.json(req.body);
};

const getTask = (req, res) => {
    res.json({ id: req.params.id });
};

const updateTask = (req, res) => {
    res.json({
        id: req.body.id,
        name: req.body.name,
    });
};

const delTask = (req, res) => {
    res.send('Delete a task');
};
module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    delTask,
};
