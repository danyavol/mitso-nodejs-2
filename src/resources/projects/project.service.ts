import { RequestError } from '../../services/errors';
import employeeRepo from '../employees/employee.memory.repository';
import { Employee, IEmployeeToResponse } from '../employees/employee.model';
import Project, { IProject, IProjectForResponse } from './project.entity';
import { ProjectRepository } from './project.repository';

const projectRepository = new ProjectRepository();

async function getAll(): Promise<IProjectForResponse[]> {
    const projects = await projectRepository.getAll();
    return projects.map(p => Project.toResponse(p));
}

async function getById(id: string): Promise<IProjectForResponse | null> {
    const project = await projectRepository.getById(id);
    return project ? Project.toResponse(project) : null;
}

async function getProjectEmployees(projectId: string): Promise<IEmployeeToResponse[]> {
    const employees = await employeeRepo.getAll();
    return employees.filter(e => e.project === projectId).map(e => Employee.toResponse(e));
}

async function create(projectData: IProject): Promise<void> {
    const project = new Project(projectData);
    await projectRepository.createProject(project);
}

async function update(id: string, projectData: IProject): Promise<void> {
    const oldProject = await projectRepository.getById(id);
    if (oldProject == null) throw new RequestError(400, 'Invalid project id');
    const newProject = new Project(oldProject).update(projectData);
    await projectRepository.updateById(id, newProject);
}

async function deleteProject(id: string): Promise<void> {
    const deleteResult = await projectRepository.deleteById(id);
    if (!deleteResult.affected) throw new RequestError(400, 'Invalid project id');

    const employees = await employeeRepo.getAll();
    const employeesWithoutProject = employees
        .filter(e => e.project === id)
        .map(e => ({ ...e, project: null }));
        
    const promises = employeesWithoutProject.map(e => employeeRepo.replaceById(e.id, e));
    await Promise.all(promises);
}

export default { getAll, getById, create, update, deleteProject, getProjectEmployees };