import {MigrationInterface, QueryRunner} from "typeorm";

export class addTitle1648950572797 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE blog ADD COLUMN title VARCHAR(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE blog DROP COLUMN title`);
    }

}
