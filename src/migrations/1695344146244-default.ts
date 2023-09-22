import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1695344146244 implements MigrationInterface {
    name = 'Default1695344146244'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "models" DROP CONSTRAINT "UQ_3492c71396207453cf17c0928fb"`);
        await queryRunner.query(`ALTER TABLE "models" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "models" ADD "name" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "models" ADD CONSTRAINT "UQ_3492c71396207453cf17c0928fb" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "models" DROP CONSTRAINT "UQ_3492c71396207453cf17c0928fb"`);
        await queryRunner.query(`ALTER TABLE "models" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "models" ADD "name" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "models" ADD CONSTRAINT "UQ_3492c71396207453cf17c0928fb" UNIQUE ("name")`);
    }

}
