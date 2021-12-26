import { v4 as uuid } from 'uuid';
import { Entity, PrimaryColumn, Column } from 'typeorm';

export interface IUserForResponse {
    id: string,
    name: string,
    login: string,
}

export interface IUser {
    id: string,
    name: string,
    login: string,
    password: string,
}

@Entity({ name: "users" })
export default class User {
    @PrimaryColumn('uuid')
    public id: string = uuid();

    @Column()
    public name!: string;

    @Column()
    public login!: string;

    @Column()
    public password!: string;

    static toResponse(user: IUser): IUserForResponse {
        const { id, name, login } = user;
        return { id, name, login };
    }

    public update(payload: IUser): User {
        const { name, login, password } = payload;
        if (name !== undefined) this.name = name;
        if (login !== undefined) this.login = login;
        if (password !== undefined) this.password = password;

        return this;
    }
}
