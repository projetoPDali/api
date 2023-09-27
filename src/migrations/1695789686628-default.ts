import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1695789686628 implements MigrationInterface {
    name = 'Default1695789686628'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bikes" DROP CONSTRAINT "FK_e2cc5400dfe31ee53796b6254d5"`);
        await queryRunner.query(`ALTER TABLE "bikes" DROP CONSTRAINT "FK_0ba7ed606b8aaff2615de060bd3"`);
        await queryRunner.query(`ALTER TABLE "bikes" DROP CONSTRAINT "FK_095587c4402c257f1333bd0f74a"`);
        await queryRunner.query(`CREATE TABLE "addresses" ("id" SERIAL NOT NULL, "street" character varying(100) NOT NULL, "city" character varying(50) NOT NULL, "state" character varying(50) NOT NULL, "cep" integer NOT NULL, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "materials" ("id" SERIAL NOT NULL, "name" character varying(20) NOT NULL, CONSTRAINT "UQ_9b614bb357c5d8741a1a381385c" UNIQUE ("name"), CONSTRAINT "PK_2fd1a93ecb222a28bef28663fa0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "models" ("id" SERIAL NOT NULL, "name" character varying(20) NOT NULL, CONSTRAINT "UQ_3492c71396207453cf17c0928fb" UNIQUE ("name"), CONSTRAINT "PK_ef9ed7160ea69013636466bf2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "bikes" DROP COLUMN "color"`);
        await queryRunner.query(`ALTER TABLE "bikes" DROP COLUMN "material"`);
        await queryRunner.query(`DROP TYPE "public"."bikes_material_enum"`);
        await queryRunner.query(`ALTER TABLE "bikes" DROP COLUMN "speedkit"`);
        await queryRunner.query(`ALTER TABLE "bikes" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "bikes" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "bikes" DROP COLUMN "idbrand"`);
        await queryRunner.query(`ALTER TABLE "bikes" DROP COLUMN "idcategory"`);
        await queryRunner.query(`ALTER TABLE "bikes" DROP COLUMN "iduser"`);
        await queryRunner.query(`ALTER TABLE "bikes" ADD "gear" character varying(10) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bikes" ADD "materialId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bikes" ADD "addressId" integer`);
        await queryRunner.query(`ALTER TABLE "bikes" ADD "brandId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bikes" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "brands" DROP CONSTRAINT "UQ_96db6bbbaa6f23cad26871339b6"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "brands" ADD "name" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "brands" ADD CONSTRAINT "UQ_96db6bbbaa6f23cad26871339b6" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "bikes" ALTER COLUMN "gender" SET DEFAULT 'unissex'`);
        await queryRunner.query(`ALTER TABLE "bikes" ADD CONSTRAINT "FK_b81e9985c2af8e7c10acda24856" FOREIGN KEY ("materialId") REFERENCES "materials"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bikes" ADD CONSTRAINT "FK_a4fa72b807a0e13c85566a31a1e" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bikes" ADD CONSTRAINT "FK_0eca6e426d783b185433615ba2e" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bikes" ADD CONSTRAINT "FK_b642a800ce392f60339425b30ff" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bikes" DROP CONSTRAINT "FK_b642a800ce392f60339425b30ff"`);
        await queryRunner.query(`ALTER TABLE "bikes" DROP CONSTRAINT "FK_0eca6e426d783b185433615ba2e"`);
        await queryRunner.query(`ALTER TABLE "bikes" DROP CONSTRAINT "FK_a4fa72b807a0e13c85566a31a1e"`);
        await queryRunner.query(`ALTER TABLE "bikes" DROP CONSTRAINT "FK_b81e9985c2af8e7c10acda24856"`);
        await queryRunner.query(`ALTER TABLE "bikes" ALTER COLUMN "gender" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "brands" DROP CONSTRAINT "UQ_96db6bbbaa6f23cad26871339b6"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "brands" ADD "name" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "brands" ADD CONSTRAINT "UQ_96db6bbbaa6f23cad26871339b6" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "bikes" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "bikes" DROP COLUMN "brandId"`);
        await queryRunner.query(`ALTER TABLE "bikes" DROP COLUMN "addressId"`);
        await queryRunner.query(`ALTER TABLE "bikes" DROP COLUMN "materialId"`);
        await queryRunner.query(`ALTER TABLE "bikes" DROP COLUMN "gear"`);
        await queryRunner.query(`ALTER TABLE "bikes" ADD "iduser" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bikes" ADD "idcategory" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bikes" ADD "idbrand" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bikes" ADD "longitude" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bikes" ADD "latitude" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bikes" ADD "speedkit" character varying(10) NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."bikes_material_enum" AS ENUM('aluminio', 'carbono', 'ferro')`);
        await queryRunner.query(`ALTER TABLE "bikes" ADD "material" "public"."bikes_material_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bikes" ADD "color" character varying(30) NOT NULL`);
        await queryRunner.query(`DROP TABLE "models"`);
        await queryRunner.query(`DROP TABLE "materials"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`ALTER TABLE "bikes" ADD CONSTRAINT "FK_095587c4402c257f1333bd0f74a" FOREIGN KEY ("iduser") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bikes" ADD CONSTRAINT "FK_0ba7ed606b8aaff2615de060bd3" FOREIGN KEY ("idcategory") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bikes" ADD CONSTRAINT "FK_e2cc5400dfe31ee53796b6254d5" FOREIGN KEY ("idbrand") REFERENCES "brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
