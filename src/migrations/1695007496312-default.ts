import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1695007496312 implements MigrationInterface {
    name = 'Default1695007496312'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bikes" DROP CONSTRAINT "FK_cc0962c2bf2c483144d49170950"`);
        await queryRunner.query(`ALTER TABLE "bikes" DROP COLUMN "kindId"`);
        await queryRunner.query(`ALTER TABLE "bikes" ALTER COLUMN "gender" SET DEFAULT 'unissex'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bikes" ALTER COLUMN "gender" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "bikes" ADD "kindId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bikes" ADD CONSTRAINT "FK_cc0962c2bf2c483144d49170950" FOREIGN KEY ("kindId") REFERENCES "kinds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
