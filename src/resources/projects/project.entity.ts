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

@Entity({ name: "projects" })
export default class Project {
    @PrimaryColumn('uuid')
    public id: string = uuid();

    @Column()
    public name!: string;

    @Column({ type: "text", nullable: true })
    public description!: string | null;

    @Column()
    public client!: string;

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
