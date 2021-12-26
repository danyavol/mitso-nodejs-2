import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Employees1640518320581 implements MigrationInterface {
    private tableName = "employees";

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
                        name: "firstName",
                        type: "varchar"
                    },
                    {
                        name: "lastName",
                        type: "varchar"
                    },
                    {
                        name: "skillLevel",
                        type: "varchar"
                    },
                    {
                        name: "salary",
                        type: "int"
                    },
                    {
                        name: "department",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "project",
                        type: "varchar",
                        isNullable: true
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