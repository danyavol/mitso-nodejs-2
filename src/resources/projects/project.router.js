const router = require('express').Router();
const projectService = require('./project.service');

router.get('/', async (req, res) => {
    try {
        const projects = await projectService.getAll();
        res.json(projects);
    } catch {
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const project = await projectService.getById(req.params.id);
        res.json(project);
    } catch {
        res.sendStatus(500);
    }
});

router.get('/:id/employees', async (req, res) => {
    try {
        const project = await projectService.getProjectEmployees(req.params.id);
        res.json(project);
    } catch {
        res.sendStatus(500);
    }
});


router.post('/', async (req, res) => {
    try {
        await projectService.create(req.body);
        res.sendStatus(204);
    } catch {
        res.sendStatus(500);
    }
});

router.put('/:id', async (req, res) => {
    try {
        await projectService.update(req.params.id, req.body);
        res.sendStatus(204);
    } catch {
        res.sendStatus(500);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await projectService.deleteProject(req.params.id);
        res.sendStatus(204);
    } catch {
        res.sendStatus(500);
    }
});

module.exports = router;