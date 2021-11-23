import { v4 as uuid } from 'uuid';

export interface IEmployeeToResponse {
    id: string,
    firstName: string,
    lastName: string,
    skillLevel: string,
    salary: number,
    department: string | null,
    project: string | null
}

export interface IEmployee {
    id: string,
    firstName: string,
    lastName: string,
    skillLevel: string,
    salary: number,
    department: string | null,
    project: string | null
}

export class Employee implements IEmployee {
    public id: string;

    public firstName: string;

    public lastName: string;

    public skillLevel: string;

    public salary: number;

    public department: string | null;

    public project: string | null;

    constructor(employee: IEmployee) {
        this.id = employee.id || uuid();
        this.firstName = employee.firstName;
        this.lastName = employee.lastName;
        this.skillLevel = employee.skillLevel;
        this.salary = employee.salary;
        this.department = employee.department;
        this.project = employee.project;
    }

    static toResponse(employee: IEmployee): IEmployeeToResponse {
        const { id, firstName, lastName, skillLevel, salary, department, project } = employee;
        return { id, firstName, lastName, skillLevel, salary, department, project };
    }

    public update(payload: IEmployee): Employee {
        const { firstName, lastName, skillLevel, salary, department, project } = payload;
        if (firstName !== undefined) this.firstName = firstName;
        if (lastName !== undefined) this.lastName = lastName;
        if (skillLevel !== undefined) this.skillLevel = skillLevel;
        if (salary !== undefined) this.salary = salary;
        if (department !== undefined) this.department = department;
        if (project !== undefined) this.project = project;

        return this;
    }
}
