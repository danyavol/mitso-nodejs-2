const departmentRepo = require('./department.memory.repository');
const employeeRepo = require('../employees/employee.memory.repository');
const Department = require('./department.model');
const Employee = require('../employees/employee.model');
const { RequestError } = require('../../services/errors');

async function getAll() {
    const departments = await departmentRepo.getAll();
    return departments.map(d => Department.toResponse(d));
}

async function getById(id) {
    const department = await departmentRepo.getById(id);
    return Department.toResponse(department);
}

async function getDepartmentEmployees(id) {
    const employees = await employeeRepo.getAll();
    return employees.filter(e => e.department === id).map(e => Employee.toResponse(e));
}

async function create(departmentData) {
    const department = new Department(departmentData);
    await departmentRepo.insert(department);
}

async function update(id, departmentData) {
    const oldDepartment = await departmentRepo.getById(id);
    if (oldDepartment == null) throw new RequestError(400, 'Invalid department id');
    const newDepartment = new Department(oldDepartment).update(departmentData);
    await departmentRepo.replaceById(id, newDepartment);
}

async function deleteDepartment(id) {
    const deletedDepartment = await departmentRepo.deleteById(id);
    if (!deletedDepartment) throw new RequestError(400, 'Invalid department id');
    const employees = await employeeRepo.getAll();
    const employeesWithoutDepartment = employees
        .filter(e => e.department === deletedDepartment.id)
        .map(e => ({ ...e, department: null }));
    const promises = employeesWithoutDepartment.map(e => employeeRepo.replaceById(e.id, e));
    await Promise.all(promises);
}

module.exports = { getAll, getById, create, update, deleteDepartment, getDepartmentEmployees };