import { v4 as uuid } from 'uuid';
import { Entity, PrimaryColumn, Column } from 'typeorm';

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

@Entity({ name: "employees" })
export default class Employee {
    @PrimaryColumn('uuid')
    public id: string = uuid();

    @Column()
    public firstName!: string;

    @Column()
    public lastName!: string;

    @Column()
    public skillLevel!: string;

    @Column()
    public salary!: number;

    @Column({ type: "text", nullable: true })
    public department!: string | null;

    @Column({ type: "text", nullable: true })
    public project!: string | null;


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
