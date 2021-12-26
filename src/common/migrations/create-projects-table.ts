import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProjectsTable implements MigrationInterface {
    private tableName = "projects";

    public async up(queryRunner: QueryRunner) {
        console.log('up');
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
        console.log('down');
        queryRunner.query(`DROP TABLE ${this.tableName}`);
    }
}