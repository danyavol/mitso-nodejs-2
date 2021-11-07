const employeeRepo = require('./employee.memory.repository');
const projectRepo = require('../projects/project.memory.repository');
const departmentRepo = require('../departments/department.memory.repository');
const Employee = require('./employee.model');
const Project = require('../projects/project.model');
const Department = require('../departments/department.model');
const { RequestError } = require('../../services/errors');

async function getAll() {
    const employees = await employeeRepo.getAll();
    return employees.map(d => Employee.toResponse(d));
}

async function getById(id) {
    const employee = await employeeRepo.getById(id);
    return Employee.toResponse(employee);
}

async function getEmployeeDepartment(id) {
    const employee = await employeeRepo.getById(id);
    const department = await departmentRepo.getById(employee.department);
    return Department.toResponse(department);
}

async function getEmployeeProject(id) {
    const employee = await employeeRepo.getById(id);
    const project = await projectRepo.getById(employee.project);
    return Project.toResponse(project);
}

async function create(employeeData) {
    const employee = new Employee(employeeData);
    await employeeRepo.insert(employee);
}

async function update(id, employeeData) {
    const oldEmployee = await employeeRepo.getById(id);
    if (oldEmployee == null) throw new RequestError(400, 'Invalid employee id');
    const newEmployee = new Employee(oldEmployee).update(employeeData);
    await employeeRepo.replaceById(id, newEmployee);
}

async function deleteEmployee(id) {
    const deletedEmployee = await employeeRepo.deleteById(id);
    if (!deletedEmployee) throw new RequestError(400, 'Invalid employee id');
}

module.exports = { getAll, getById, create, update, deleteEmployee, getEmployeeDepartment, getEmployeeProject };