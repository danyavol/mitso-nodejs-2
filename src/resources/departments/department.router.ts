import express, { Request, Response, Router } from "express";
import { handleError } from '../../services/handle-error.service';
import departmentService from './department.service';


const router: Router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    try {
        const departments = await departmentService.getAll();
        res.json(departments);
    } catch(err) {
        handleError(res, err);
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const department = await departmentService.getById(req.params["id"] || '');
        res.json(department);
    } catch(err) {
        handleError(res, err);
    }
});

router.get('/:id/employees', async (req: Request, res: Response) => {
    try {
        const department = await departmentService.getDepartmentEmployees(req.params["id"] || '');
        res.json(department);
    } catch(err) {
        handleError(res, err);
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        await departmentService.create(req.body);
        res.sendStatus(204);
    } catch(err) {
        handleError(res, err);
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        await departmentService.update(req.params["id"] || '', req.body);
        res.sendStatus(204);
    } catch(err) {
        handleError(res, err);
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        await departmentService.deleteDepartment(req.params["id"] || '');
        res.sendStatus(204);
    } catch(err) {
        handleError(res, err);
    }
});

export default router;