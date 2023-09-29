import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1695063034168 implements MigrationInterface {
    name = 'Default1695063034168'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bikes" DROP CONSTRAINT "FK_c0935a8c3476c6d5eaa84301221"`);
        await queryRunner.query(`ALTER TABLE "bikes" DROP COLUMN "categoryId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bikes" ADD "categoryId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bikes" ADD CONSTRAINT "FK_c0935a8c3476c6d5eaa84301221" FOREIGN KEY ("categoryId") REFERENCES "models"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
