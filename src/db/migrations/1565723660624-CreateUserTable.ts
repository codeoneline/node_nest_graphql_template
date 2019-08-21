import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1565723660624 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        return await queryRunner.createTable(new Table({
            name: 'User',
            columns: [
                {
                    name: 'userKey',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: 'password',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'firstNme',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'lastNme',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'createdDte',
                    type: 'date',
                    default: 'NOW()',
                },
                {
                    name: 'updatedDte',
                    type: 'date',
                    default: 'NOW()',
                },
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        return await queryRunner.dropTable('User');
    }

}
