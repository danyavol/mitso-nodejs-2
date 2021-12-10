import express, { NextFunction, Request, Response } from 'express';
import { loggerMiddleware } from './middlewares';
import departmentRouter from './resources/departments/department.router';
import projectRouter from './resources/projects/project.router';
import employeeRouter from './resources/employees/employee.router';

const app = express();

app.use(express.json());

app.use('/', (req: Request, res: Response, next: NextFunction) => {
    if (req.originalUrl === '/') {
        res.send('Service is running!');
        return;
    }
    next();
});

app.use(loggerMiddleware);
app.use('/departments', departmentRouter);
app.use('/projects', projectRouter);
app.use('/employees', employeeRouter);

export default app;
