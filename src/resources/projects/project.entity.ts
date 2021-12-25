import { v4 as uuid } from 'uuid';
import { Entity, PrimaryColumn, Column } from 'typeorm';

export interface IProjectForResponse {
    id: string,
    name: string,
    description: string | null,
    client: string
}

export interface IProject {
    id: string,
    name: string,
    description: string | null,
    client: string
}

@Entity({ name: 'projects' })
export default class Project {
    @PrimaryColumn('uuid')
    public id: string;

    @Column()
    public name: string;

    @Column()
    public description: string | null;

    @Column()
    public client: string;

    constructor(project: IProject) {
        this.id = project.id || uuid();
        this.name = project.name;
        this.description = project.description;
        this.client = project.client;
    }

    static toResponse(project: IProject): IProjectForResponse {
        const { id, name, description, client } = project;
        return { id, name, description, client };
    }

    public update(payload: IProject): Project {
        const { name, description, client } = payload;
        if (name !== undefined) this.name = name;
        if (description !== undefined) this.description = description;
        if (client !== undefined) this.client = client;

        return this;
    }
}
