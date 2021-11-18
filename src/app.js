const express = require('express');
const departmentRouter = require('./resources/departments/department.router');
const projectRouter = require('./resources/projects/project.router');
const employeeRouter = require('./resources/employees/employee.router');

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
app.use('/projects', projectRouter);
app.use('/employees', employeeRouter);

module.exports = app;
