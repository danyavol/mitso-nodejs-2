const express = require('express');
const departmentRouter = require('./resources/departments/department.router');

const app = express();

app.use(express.json());

app.use('/', (req, res, next) => {
    if (req.originalUrl === '/') {
        res.send('Service is running!');
        return;
    }
    next();
});

app.use('/departments', departmentRouter);

module.exports = app;
