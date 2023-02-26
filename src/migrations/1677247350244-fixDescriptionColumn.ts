import { MigrationInterface, QueryRunner } from "typeorm";

export class fixDescriptionColumn1677247350244 implements MigrationInterface {
    name = 'fixDescriptionColumn1677247350244'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" DROP CONSTRAINT "UQ_3a794f850bd3e432c46b3faa913"`);
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "movies" ADD "name" character varying(150) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movies" ADD CONSTRAINT "UQ_3a794f850bd3e432c46b3faa913" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "movies" ADD "description" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "movies" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "movies" DROP CONSTRAINT "UQ_3a794f850bd3e432c46b3faa913"`);
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "movies" ADD "name" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movies" ADD CONSTRAINT "UQ_3a794f850bd3e432c46b3faa913" UNIQUE ("name")`);
    }

}
