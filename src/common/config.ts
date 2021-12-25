import dotenv from 'dotenv';
import path from 'path';
import { ConnectionOptions } from 'typeorm';

dotenv.config({
    path: path.join(__dirname, '../../.env'),
});

export const PORT = Number(process.env['PORT']) || 4000;
export const POSTGRES_PORT = Number(process.env['POSTGRES_PORT']) || 5432;

export const {
    POSTGRES_HOST,
    POSTGRES_USER, 
    POSTGRES_PASSWORD, 
    POSTGRES_DB
} = process.env;

export const databaseConfig: ConnectionOptions = {
    type: "postgres",
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    entities: [path.join(__dirname, '../**/*.entity.ts')],
};
