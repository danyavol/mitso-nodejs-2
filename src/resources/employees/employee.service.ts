import { RequestError } from '../../services/errors';
import departmentRepo from '../departments/department.memory.repository';
import { Department, IDepartmentToResponse } from '../departments/department.model';
import projectRepo from '../projects/project.memory.repository';
import { IProjectForResponse, Project } from '../projects/project.model';
import employeeRepo from './employee.memory.repository';
import { Employee, IEmployee, IEmployeeToResponse } from './employee.model';

async function getAll(): Promise<IEmployeeToResponse[]> {
    const employees = await employeeRepo.getAll();
    return employees.map(d => Employee.toResponse(d));
}

async function getById(id: string): Promise<IEmployeeToResponse | null> {
    const employee = await employeeRepo.getById(id);
    return employee ? Employee.toResponse(employee) : null;
}

async function getEmployeeDepartment(id: string): Promise<IDepartmentToResponse | null> {
    const employee = await employeeRepo.getById(id);
    const department = await departmentRepo.getById(employee?.department || '');
    return department ? Department.toResponse(department) : null;
}

async function getEmployeeProject(id: string): Promise<IProjectForResponse | null> {
    const employee = await employeeRepo.getById(id);
    const project = await projectRepo.getById(employee?.project || '');
    return project ? Project.toResponse(project): null;
}

async function create(employeeData: IEmployee): Promise<void> {
    const employee = new Employee(employeeData);
    await employeeRepo.insert(employee);
}

async function update(id: string, employeeData: IEmployee): Promise<void> {
    const oldEmployee = await employeeRepo.getById(id);
    if (oldEmployee == null) throw new RequestError(400, 'Invalid employee id');
    const newEmployee = new Employee(oldEmployee).update(employeeData);
    await employeeRepo.replaceById(id, newEmployee);
}

async function deleteEmployee(id: string): Promise<void> {
    const deletedEmployee = await employeeRepo.deleteById(id);
    if (!deletedEmployee) throw new RequestError(400, 'Invalid employee id');
}

export default { getAll, getById, create, update, deleteEmployee, getEmployeeDepartment, getEmployeeProject };