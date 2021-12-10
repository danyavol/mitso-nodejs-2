import express, { Request, Response, Router } from 'express';
import { handleError } from '../../services/handle-error.service';
import employeeService from './employee.service';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const employees = await employeeService.getAll();
        res.json(employees);
    } catch(err) {
        handleError(err, req, res);
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const employee = await employeeService.getById(req.params["id"] || '');
        res.json(employee);
    } catch(err) {
        handleError(err, req, res);
    }
});

router.get('/:id/department', async (req: Request, res: Response) => {
    try {
        const department = await employeeService.getEmployeeDepartment(req.params["id"] || '');
        res.json(department);
    } catch(err) {
        handleError(err, req, res);
    }
});

router.get('/:id/project', async (req: Request, res: Response) => {
    try {
        const project = await employeeService.getEmployeeProject(req.params["id"] || '');
        res.json(project);
    } catch(err) {
        handleError(err, req, res);
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        await employeeService.create(req.body);
        res.sendStatus(204);
    } catch(err) {
        handleError(err, req, res);
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        await employeeService.update(req.params["id"] || '', req.body);
        res.sendStatus(204);
    } catch(err) {
        handleError(err, req, res);
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        await employeeService.deleteEmployee(req.params["id"] || '');
        res.sendStatus(204);
    } catch(err) {
        handleError(err, req, res);
    }
});

export default router;