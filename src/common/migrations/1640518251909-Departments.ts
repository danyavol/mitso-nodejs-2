

import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Departments1640518251909 implements MigrationInterface {
    private tableName = "departments";

    public async up(queryRunner: QueryRunner) {
        await queryRunner.createTable(
            new Table({
                name: this.tableName,
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        isUnique: true,
                        isGenerated: true,
                        generationStrategy: "uuid"
                    },
                    {
                        name: "name",
                        type: "varchar"
                    }
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner) {
        queryRunner.query(`DROP TABLE ${this.tableName}`);
    }
}