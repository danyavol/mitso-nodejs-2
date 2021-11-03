const router = require('express').Router();
const departmentService = require('./department.service');

router.get('/', async (req, res) => {
    try {
        const departments = await departmentService.getAll();
        res.json(departments);
    } catch {
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const department = await departmentService.getById(req.params.id);
        res.json(department);
    } catch {
        res.sendStatus(500);
    }
});

router.get('/:id/employees', async (req, res) => {
    try {
        const department = await departmentService.getAllDepartmentEmployees(req.params.id);
        res.json(department);
    } catch {
        res.sendStatus(500);
    }
});

router.post('/', async (req, res) => {
    try {
        await departmentService.create(req.body);
        res.sendStatus(204);
    } catch {
        res.sendStatus(500);
    }
});

router.put('/:id', async (req, res) => {
    try {
        await departmentService.update(req.params.id, req.body);
        res.sendStatus(204);
    } catch {
        res.sendStatus(500);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await departmentService.deleteDepartment(req.params.id);
        res.sendStatus(204);
    } catch {
        res.sendStatus(500);
    }
});

module.exports = router;