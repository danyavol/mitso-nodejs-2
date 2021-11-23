import { v4 as uuid } from 'uuid';

export interface IDepartmentToResponse {
    id: string,
    name: string | null
}

export interface IDepartment {
    id: string,
    name: string | null
}

export class Department implements IDepartment {
    public id: string;

    public name: string | null;

    constructor(department?: IDepartment) {
        this.id = department?.id || uuid();
        this.name = department?.name || null;
    }

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