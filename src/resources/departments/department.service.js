const departmentRepo = require('./department.memory.repository');
const employeeRepo = require('../employees/employee.memory.repository');
const Department = require('./department.model');
const Employee = require('../employees/employee.model');

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
    await departmentRepo.replaceById(id, { ...oldDepartment, ...departmentData });
}

async function deleteDepartment(id) {
    await departmentRepo.deleteById(id);
}

module.exports = { getAll, getById, create, update, deleteDepartment, getDepartmentEmployees };