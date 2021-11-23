import express, { Request, Response, Router } from 'express';
import { handleError } from '../../services/handle-error.service';
import projectService from './project.service';

const router: Router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    try {
        const projects = await projectService.getAll();
        res.json(projects);
    } catch(err) {
        handleError(res, err);
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const project = await projectService.getById(req.params['id'] || '');
        res.json(project);
    } catch(err) {
        handleError(res, err);
    }
});

router.get('/:id/employees', async (req: Request, res: Response) => {
    try {
        const project = await projectService.getProjectEmployees(req.params['id'] || '');
        res.json(project);
    } catch(err) {
        handleError(res, err);
    }
});


router.post('/', async (req: Request, res: Response) => {
    try {
        await projectService.create(req.body);
        res.sendStatus(204);
    } catch(err) {
        handleError(res, err);
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        await projectService.update(req.params['id'] || '', req.body);
        res.sendStatus(204);
    } catch(err) {
        handleError(res, err);
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        await projectService.deleteProject(req.params['id'] || '');
        res.sendStatus(204);
    } catch(err) {
        handleError(res, err);
    }
});

export default router;