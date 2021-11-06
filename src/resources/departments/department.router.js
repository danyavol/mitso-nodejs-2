const router = require('express').Router();
const { handleError } = require('../../services/handle-error.service');
const departmentService = require('./department.service');

router.get('/', async (req, res) => {
    try {
        const departments = await departmentService.getAll();
        res.json(departments);
    } catch(err) {
        handleError(res, err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const department = await departmentService.getById(req.params.id);
        res.json(department);
    } catch(err) {
        handleError(res, err);
    }
});

router.get('/:id/employees', async (req, res) => {
    try {
        const department = await departmentService.getDepartmentEmployees(req.params.id);
        res.json(department);
    } catch(err) {
        handleError(res, err);
    }
});

router.post('/', async (req, res) => {
    try {
        await departmentService.create(req.body);
        res.sendStatus(204);
    } catch(err) {
        handleError(res, err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        await departmentService.update(req.params.id, req.body);
        res.sendStatus(204);
    } catch(err) {
        handleError(res, err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await departmentService.deleteDepartment(req.params.id);
        res.sendStatus(204);
    } catch(err) {
        handleError(res, err);
    }
});

module.exports = router;