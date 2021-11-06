const projectRepo = require('./project.memory.repository');
const employeeRepo = require('../employees/employee.memory.repository');
const Project = require('./project.model');
const Employee = require('../employees/employee.model');

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
    await projectRepo.replaceById(id, { ...oldProject, ...projectData });
}

async function deleteProject(id) {
    await projectRepo.deleteById(id);
}

module.exports = { getAll, getById, create, update, deleteProject, getProjectEmployees };