import express, { Request, Response, Router } from 'express';
import { handleError } from '../../services/handle-error.service';
import projectService from './project.service';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const projects = await projectService.getAll();
        throw new Error('123123123123')
        res.json(projects);
    } catch(err) {
        handleError(err, req, res);
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const project = await projectService.getById(req.params['id'] || '');
        res.json(project);
    } catch(err) {
        handleError(err, req, res);
    }
});

router.get('/:id/employees', async (req: Request, res: Response) => {
    try {
        const project = await projectService.getProjectEmployees(req.params['id'] || '');
        res.json(project);
    } catch(err) {
        handleError(err, req, res);
    }
});


router.post('/', async (req: Request, res: Response) => {
    try {
        await projectService.create(req.body);
        res.sendStatus(204);
    } catch(err) {
        handleError(err, req, res);
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        await projectService.update(req.params['id'] || '', req.body);
        res.sendStatus(204);
    } catch(err) {
        handleError(err, req, res);
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        await projectService.deleteProject(req.params['id'] || '');
        res.sendStatus(204);
    } catch(err) {
        handleError(err, req, res);
    }
});

export default router;