import { RequestError } from '../../services/errors';
import employeeRepo from '../employees/employee.memory.repository';
import { Employee, IEmployeeToResponse } from '../employees/employee.model';
import projectRepo from './project.memory.repository';
import { IProject, IProjectForResponse, Project } from './project.model';

async function getAll(): Promise<IProjectForResponse[]> {
    const projects = await projectRepo.getAll();
    return projects.map(p => Project.toResponse(p));
}

async function getById(id: string): Promise<IProjectForResponse | null> {
    const project = await projectRepo.getById(id);
    return project ? Project.toResponse(project) : null;
}

async function getProjectEmployees(projectId: string): Promise<IEmployeeToResponse[]> {
    const employees = await employeeRepo.getAll();
    return employees.filter(e => e.project === projectId).map(e => Employee.toResponse(e));
}

async function create(projectData: IProject): Promise<void> {
    const project = new Project(projectData);
    await projectRepo.insert(project);
}

async function update(id: string, projectData: IProject): Promise<void> {
    const oldProject = await projectRepo.getById(id);
    if (oldProject == null) throw new RequestError(400, 'Invalid project id');
    const newProject = new Project(oldProject).update(projectData);
    await projectRepo.replaceById(id, newProject);
}

async function deleteProject(id: string): Promise<void> {
    const deletedProject = await projectRepo.deleteById(id);
    if (!deletedProject) throw new RequestError(400, 'Invalid project id');
    const employees = await employeeRepo.getAll();
    const employeesWithoutProject = employees
        .filter(e => e.project === deletedProject.id)
        .map(e => ({ ...e, project: null }));
    const promises = employeesWithoutProject.map(e => employeeRepo.replaceById(e.id, e));
    await Promise.all(promises);
}

export default { getAll, getById, create, update, deleteProject, getProjectEmployees };