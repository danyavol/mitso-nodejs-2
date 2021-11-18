const projectRepo = require('./project.memory.repository');
const employeeRepo = require('../employees/employee.memory.repository');
const Project = require('./project.model');
const Employee = require('../employees/employee.model');
const { RequestError } = require('../../services/errors');

async function getAll() {
    const departments = await projectRepo.getAll();
    return departments.map(d => Project.toResponse(d));
}

async function getById(id) {
    const department = await projectRepo.getById(id);
    return Project.toResponse(department);
}

async function getProjectEmployees(projectId) {
    const employees = await employeeRepo.getAll();
    return employees.filter(e => e.project === projectId).map(e => Employee.toResponse(e));
}

async function create(projectData) {
    const department = new Project(projectData);
    await projectRepo.insert(department);
}

async function update(id, projectData) {
    const oldProject = await projectRepo.getById(id);
    if (oldProject == null) throw new RequestError(400, 'Invalid project id');
    const newProject = new Project(oldProject).update(projectData);
    await projectRepo.replaceById(id, newProject);
}

async function deleteProject(id) {
    const deletedProject = await projectRepo.deleteById(id);
    if (!deletedProject) throw new RequestError(400, 'Invalid project id');
    const employees = await employeeRepo.getAll();
    const employeesWithoutProject = employees
        .filter(e => e.project === deletedProject.id)
        .map(e => ({ ...e, project: null }));
    const promises = employeesWithoutProject.map(e => employeeRepo.replaceById(e.id, e));
    await Promise.all(promises);
}

module.exports = { getAll, getById, create, update, deleteProject, getProjectEmployees };