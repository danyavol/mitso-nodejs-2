import { v4 as uuid } from 'uuid';
import { Entity, PrimaryColumn, Column } from 'typeorm';

export interface IDepartmentToResponse {
    id: string,
    name: string
}

export interface IDepartment {
    id: string,
    name: string
}

@Entity({ name: "departments" })
export default class Department {
    @PrimaryColumn('uuid')
    public id: string = uuid();

    @Column()
    public name!: string;

    static toResponse(department: IDepartment): IDepartmentToResponse {
        const { id, name } = department;
        return { id, name };
    }

    public update(payload: IDepartment): Department {
        const { name } = payload;
        if (name !== undefined) this.name = name;

        return this;
    }
}
