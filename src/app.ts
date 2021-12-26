import cookieParser from 'cookie-parser';
import express, { NextFunction, Request, Response } from 'express';
import { loggerMiddleware } from './middlewares';
import authRouter from './resources/auth/auth.router';
import departmentRouter from './resources/departments/department.router';
import employeeRouter from './resources/employees/employee.router';
import projectRouter from './resources/projects/project.router';
import userRouter from './resources/users/user.router';
import { authOnly } from './services/auth.service';

const app = express();

app.use( express.json() );
app.use( cookieParser() )

app.use('/', (req: Request, res: Response, next: NextFunction) => {
    if (req.originalUrl === '/') {
        res.send('Service is running!');
        return;
    }
    next();
});

app.use(loggerMiddleware);
app.use('/auth', authRouter);
app.use('/departments', authOnly, departmentRouter);
app.use('/projects', authOnly, projectRouter);
app.use('/employees', authOnly, employeeRouter);
app.use('/users', authOnly, userRouter);

export default app;
