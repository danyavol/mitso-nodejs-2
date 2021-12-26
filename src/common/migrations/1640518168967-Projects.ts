import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Projects1640518168967 implements MigrationInterface {
    private tableName = "projects";

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
                    },
                    {
                        name: "description",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "client",
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