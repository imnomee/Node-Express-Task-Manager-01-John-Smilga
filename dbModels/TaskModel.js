const mongoose = require('mongoose');
//schema will set the structure for that collection
const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [20, 'Max 20 characters'],
    },
    completed: {
        type: Boolean,
        default: false,
        required: [true, 'Status is required'],
    },
});

module.exports = mongoose.model('Task', TaskSchema);
