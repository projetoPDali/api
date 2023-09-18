import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1695008859316 implements MigrationInterface {
    name = 'Default1695008859316'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" SERIAL NOT NULL, "street" character varying(100) NOT NULL, "city" character varying(50) NOT NULL, "state" character varying(50) NOT NULL, "cep" integer NOT NULL, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "bikes" DROP COLUMN "speedkit"`);
        await queryRunner.query(`ALTER TABLE "bikes" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "bikes" ADD "gear" character varying(10) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bikes" ADD "addressId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bikes" ADD CONSTRAINT "FK_a4fa72b807a0e13c85566a31a1e" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bikes" DROP CONSTRAINT "FK_a4fa72b807a0e13c85566a31a1e"`);
        await queryRunner.query(`ALTER TABLE "bikes" DROP COLUMN "addressId"`);
        await queryRunner.query(`ALTER TABLE "bikes" DROP COLUMN "gear"`);
        await queryRunner.query(`ALTER TABLE "bikes" ADD "address" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bikes" ADD "speedkit" character varying(10) NOT NULL`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
