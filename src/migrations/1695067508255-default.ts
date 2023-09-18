import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1695067508255 implements MigrationInterface {
    name = 'Default1695067508255'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bikes" DROP CONSTRAINT "FK_a4fa72b807a0e13c85566a31a1e"`);
        await queryRunner.query(`ALTER TABLE "bikes" ALTER COLUMN "addressId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bikes" ADD CONSTRAINT "FK_a4fa72b807a0e13c85566a31a1e" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bikes" DROP CONSTRAINT "FK_a4fa72b807a0e13c85566a31a1e"`);
        await queryRunner.query(`ALTER TABLE "bikes" ALTER COLUMN "addressId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bikes" ADD CONSTRAINT "FK_a4fa72b807a0e13c85566a31a1e" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
