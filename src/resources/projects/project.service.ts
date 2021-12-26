import { getCustomRepository } from 'typeorm';
import { RequestError } from '../../services/errors';
import { EmployeeRepository } from '../employees/employee.repository';
import Employee, { IEmployeeToResponse } from '../employees/employee.entity';
import Project, { IProject, IProjectForResponse } from './project.entity';
import { ProjectRepository } from './project.repository';

async function getAll(): Promise<IProjectForResponse[]> {
    const projectRepository = getCustomRepository(ProjectRepository);

    const projects = await projectRepository.getAll();
    return projects.map(p => Project.toResponse(p));
}

async function getById(id: string): Promise<IProjectForResponse | null> {
    const projectRepository = getCustomRepository(ProjectRepository);

    const project = await projectRepository.getById(id);
    return project ? Project.toResponse(project) : null;
}

async function getProjectEmployees(projectId: string): Promise<IEmployeeToResponse[]> {
    const employeeRepository = getCustomRepository(EmployeeRepository);

    const employees = await employeeRepository.getAll();
    return employees.filter(e => e.project === projectId).map(e => Employee.toResponse(e));
}

async function create(projectData: IProject): Promise<void> {
    const projectRepository = getCustomRepository(ProjectRepository);

    const project = new Project().update(projectData);
    await projectRepository.create(project);
}

async function update(id: string, projectData: IProject): Promise<void> {
    const projectRepository = getCustomRepository(ProjectRepository);

    const oldProject = await projectRepository.getById(id);
    if (oldProject == null) throw new RequestError(400, 'Invalid project id');
    
    const newProject = new Project().update(oldProject).update(projectData);
    await projectRepository.updateById(id, newProject);
}

async function deleteProject(id: string): Promise<void> {
    const projectRepository = getCustomRepository(ProjectRepository);
    const employeeRepository = getCustomRepository(EmployeeRepository);

    const deleteResult = await projectRepository.deleteById(id);
    if (!deleteResult.affected) throw new RequestError(400, 'Invalid project id');

    const employees = await employeeRepository.getAll();
    const employeesWithoutProject = employees.filter(e => e.project === id);
    employeesWithoutProject.forEach(e => { e.project = null; })

    const promises = employeesWithoutProject.map(e => employeeRepository.updateById(e.id, e));
    await Promise.all(promises);
}

export default { getAll, getById, create, update, deleteProject, getProjectEmployees };