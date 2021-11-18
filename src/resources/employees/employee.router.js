const router = require('express').Router();
const { handleError } = require('../../services/handle-error.service');
const employeeService = require('./employee.service');

router.get('/', async (req, res) => {
    try {
        const employees = await employeeService.getAll();
        res.json(employees);
    } catch(err) {
        handleError(res, err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const employee = await employeeService.getById(req.params.id);
        res.json(employee);
    } catch(err) {
        handleError(res, err);
    }
});

router.get('/:id/department', async (req, res) => {
    try {
        const department = await employeeService.getEmployeeDepartment(req.params.id);
        res.json(department);
    } catch(err) {
        handleError(res, err);
    }
});

router.get('/:id/project', async (req, res) => {
    try {
        const project = await employeeService.getEmployeeProject(req.params.id);
        res.json(project);
    } catch(err) {
        handleError(res, err);
    }
});

router.post('/', async (req, res) => {
    try {
        await employeeService.create(req.body);
        res.sendStatus(204);
    } catch(err) {
        handleError(res, err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        await employeeService.update(req.params.id, req.body);
        res.sendStatus(204);
    } catch(err) {
        handleError(res, err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await employeeService.deleteEmployee(req.params.id);
        res.sendStatus(204);
    } catch(err) {
        handleError(res, err);
    }
});

module.exports = router;