import express, { Request, Response, Router } from "express";
import { handleError } from '../../services/handle-error.service';
import departmentService from './department.service';


const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const departments = await departmentService.getAll();
        res.json(departments);
    } catch(err) {
        handleError(err, req, res);
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const department = await departmentService.getById(req.params["id"] || '');
        res.json(department);
    } catch(err) {
        handleError(err, req, res);
    }
});

router.get('/:id/employees', async (req: Request, res: Response) => {
    try {
        const department = await departmentService.getDepartmentEmployees(req.params["id"] || '');
        res.json(department);
    } catch(err) {
        handleError(err, req, res);
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        await departmentService.create(req.body);
        res.sendStatus(204);
    } catch(err) {
        handleError(err, req, res);
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        await departmentService.update(req.params["id"] || '', req.body);
        res.sendStatus(204);
    } catch(err) {
        handleError(err, req, res);
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        await departmentService.deleteDepartment(req.params["id"] || '');
        res.sendStatus(204);
    } catch(err) {
        handleError(err, req, res);
    }
});

export default router;