import { getCustomRepository } from 'typeorm';
import { RequestError } from '../../services/errors';
import Department, { IDepartmentToResponse } from '../departments/department.entity';
import { DepartmentRepository } from '../departments/department.repository';
import Project, { IProjectForResponse } from '../projects/project.entity';
import { ProjectRepository } from '../projects/project.repository';
import Employee, { IEmployee, IEmployeeToResponse } from './employee.entity';
import { EmployeeRepository } from './employee.repository';

async function getAll(): Promise<IEmployeeToResponse[]> {
    const employeeRepository = getCustomRepository(EmployeeRepository);

    const employees = await employeeRepository.getAll();
    return employees.map(e => Employee.toResponse(e));
}

async function getById(id: string): Promise<IEmployeeToResponse | null> {
    const employeeRepository = getCustomRepository(EmployeeRepository);

    const employee = await employeeRepository.getById(id);
    return employee ? Employee.toResponse(employee) : null;
}

async function getEmployeeDepartment(id: string): Promise<IDepartmentToResponse | null> {
    const employeeRepository = getCustomRepository(EmployeeRepository);
    const departmentRepository = getCustomRepository(DepartmentRepository);

    const employee = await employeeRepository.getById(id);
    const department = await departmentRepository.getById(employee?.department || '');
    return department ? Department.toResponse(department) : null;
}

async function getEmployeeProject(id: string): Promise<IProjectForResponse | null> {
    const employeeRepository = getCustomRepository(EmployeeRepository);
    const projectRepository = getCustomRepository(ProjectRepository);

    const employee = await employeeRepository.getById(id);
    const project = await projectRepository.getById(employee?.project || '');
    return project ? Project.toResponse(project): null;
}

async function create(employeeData: IEmployee): Promise<void> {
    const employeeRepository = getCustomRepository(EmployeeRepository);

    const employee = new Employee().update(employeeData);
    await employeeRepository.create(employee);
}

async function update(id: string, employeeData: IEmployee): Promise<void> {
    const employeeRepository = getCustomRepository(EmployeeRepository);

    const oldEmployee = await employeeRepository.getById(id);
    if (oldEmployee == null) throw new RequestError(400, 'Invalid employee id');

    const newEmployee = new Employee().update(oldEmployee).update(employeeData);
    await employeeRepository.updateById(id, newEmployee);
}

async function deleteEmployee(id: string): Promise<void> {
    const employeeRepository = getCustomRepository(EmployeeRepository);

    const deleteResult = await employeeRepository.deleteById(id);
    if (!deleteResult.affected) throw new RequestError(400, 'Invalid employee id');
}

export default { getAll, getById, create, update, deleteEmployee, getEmployeeDepartment, getEmployeeProject };