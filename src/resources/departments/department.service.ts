import { getCustomRepository } from 'typeorm';
import { RequestError } from '../../services/errors';
import Employee, { IEmployee, IEmployeeToResponse } from '../employees/employee.entity';
import { EmployeeRepository } from '../employees/employee.repository';
import Department, { IDepartment, IDepartmentToResponse } from './department.entity';
import { DepartmentRepository } from './department.repository';

async function getAll(): Promise<IDepartmentToResponse[]> {
    const departmentRepository = getCustomRepository(DepartmentRepository);

    const departments = await departmentRepository.getAll();
    return departments.map((d: IDepartment) => Department.toResponse(d));
}

async function getById(id: string): Promise<IDepartmentToResponse | null> {
    const departmentRepository = getCustomRepository(DepartmentRepository);

    const department = await departmentRepository.getById(id);
    return department ? Department.toResponse(department) : null;
}

async function getDepartmentEmployees(id: string): Promise<IEmployeeToResponse[]> {
    const employeeRepository = getCustomRepository(EmployeeRepository);

    const employees = await employeeRepository.getAll();
    return employees.filter((e: IEmployee) => e.department === id).map((e: IEmployee) => Employee.toResponse(e));
}

async function create(departmentData: IDepartment): Promise<void> {
    const departmentRepository = getCustomRepository(DepartmentRepository);

    const department = new Department().update(departmentData);
    await departmentRepository.create(department);
}

async function update(id: string, departmentData: IDepartment): Promise<void> {
    const departmentRepository = getCustomRepository(DepartmentRepository);

    const oldDepartment = await departmentRepository.getById(id);
    if (oldDepartment == null) throw new RequestError(400, 'Invalid department id');

    const newDepartment = new Department().update(oldDepartment).update(departmentData);
    await departmentRepository.updateById(id, newDepartment);
}

async function deleteDepartment(id: string): Promise<void> {
    const departmentRepository = getCustomRepository(DepartmentRepository);
    const employeeRepository = getCustomRepository(EmployeeRepository);

    const deleteResult = await departmentRepository.deleteById(id);
    if (!deleteResult.affected) throw new RequestError(400, 'Invalid department id');

    const employees = await employeeRepository.getAll();
    const employeesWithoutDepartment = employees
        .filter((e: IEmployee) => e.department === id);
    employeesWithoutDepartment.forEach((e: IEmployee) => { e.department = null; });

    const promises = employeesWithoutDepartment.map(e => employeeRepository.updateById(e.id, e));
    await Promise.all(promises);
}

export default {
    getAll, getById, getDepartmentEmployees, create, update, deleteDepartment
};