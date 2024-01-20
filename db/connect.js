const mongoose = require('mongoose');

const connectionString = `mongodb+srv://imnomee:nauman786@cluster0.x1t02o7.mongodb.net/task-manager?retryWrites=true&w=majority`;

mongoose
    .connect(connectionString, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => console.log('CONNECTED to the DB...'))
    .catch((err) => console.log(err));
