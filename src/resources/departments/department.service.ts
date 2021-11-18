import departmentRepo from './department.memory.repository';
import employeeRepo from '../employees/employee.memory.repository';
import { Department, IDepartmentToResponse, IDepartment } from './department.model';
import Employee from '../employees/employee.model';
import { RequestError } from '../../services/errors';

async function getAll(): Promise<IDepartmentToResponse[]> {
    const departments = await departmentRepo.getAll();
    return departments.map((d: IDepartment) => Department.toResponse(d));
}

async function getById(id: string): Promise<IDepartmentToResponse | null> {
    const department = await departmentRepo.getById(id);
    return department ? Department.toResponse(department) : null;
}

async function getDepartmentEmployees(id: string): Promise<any> {
    const employees = await employeeRepo.getAll();
    return employees.filter((e: Employee) => e.department === id).map((e: Employee) => Employee.toResponse(e));
}

async function create(departmentData: IDepartment): Promise<void> {
    const department = new Department(departmentData);
    await departmentRepo.insert(department);
}

async function update(id: string, departmentData: IDepartment): Promise<void> {
    const oldDepartment = await departmentRepo.getById(id);
    if (oldDepartment == null) throw new RequestError(400, 'Invalid department id');
    const newDepartment = new Department(oldDepartment).update(departmentData);
    await departmentRepo.replaceById(id, newDepartment);
}

async function deleteDepartment(id: string): Promise<void> {
    const deletedDepartment = await departmentRepo.deleteById(id);
    if (!deletedDepartment) throw new RequestError(400, 'Invalid department id');
    const employees = await employeeRepo.getAll();
    const employeesWithoutDepartment = employees
        .filter((e: Employee) => e.department === deletedDepartment.id)
        .map((e: Employee) => ({ ...e, department: null }));
    const promises = employeesWithoutDepartment.map((e: Employee) => employeeRepo.replaceById(e.id, e));
    await Promise.all(promises);
}

export default {
    getAll, getById, getDepartmentEmployees, create, update, deleteDepartment
};