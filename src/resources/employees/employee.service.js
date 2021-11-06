const employeeRepo = require('./employee.memory.repository');
const projectRepo = require('../projects/project.memory.repository');
const departmentRepo = require('../departments/department.memory.repository');
const Employee = require('./employee.model');
const Project = require('../projects/project.model');
const Department = require('../departments/department.model');

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
    await employeeRepo.replaceById(id, { ...oldEmployee, ...employeeData });
}

async function deleteEmployee(id) {
    await employeeRepo.deleteById(id);
}

module.exports = { getAll, getById, create, update, deleteEmployee, getEmployeeDepartment, getEmployeeProject };