import { v4 as uuid } from 'uuid';

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

export class Project {
    public id: string;

    public name: string;

    public description: string | null;

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
