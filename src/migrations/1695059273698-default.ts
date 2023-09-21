import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1695059273698 implements MigrationInterface {
    name = 'Default1695059273698'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rents" DROP CONSTRAINT "FK_dd92549193bf2f91cac75dea5b6"`);
        await queryRunner.query(`ALTER TABLE "rents" DROP CONSTRAINT "FK_81bc567fa332f1fffe1df4e9ae6"`);
        await queryRunner.query(`ALTER TABLE "rents" DROP COLUMN "bikeId"`);
        await queryRunner.query(`ALTER TABLE "rents" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "rents" ADD "idbike" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rents" ADD "idowner" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rents" ADD "idclient" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rents" ADD CONSTRAINT "FK_d52f379295e0bf7b349860737c3" FOREIGN KEY ("idbike") REFERENCES "bikes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rents" ADD CONSTRAINT "FK_a0f943251d6cd8ce15a79524b46" FOREIGN KEY ("idowner") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rents" ADD CONSTRAINT "FK_f020693c8758fc5605fb92103e0" FOREIGN KEY ("idclient") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rents" DROP CONSTRAINT "FK_f020693c8758fc5605fb92103e0"`);
        await queryRunner.query(`ALTER TABLE "rents" DROP CONSTRAINT "FK_a0f943251d6cd8ce15a79524b46"`);
        await queryRunner.query(`ALTER TABLE "rents" DROP CONSTRAINT "FK_d52f379295e0bf7b349860737c3"`);
        await queryRunner.query(`ALTER TABLE "rents" DROP COLUMN "idclient"`);
        await queryRunner.query(`ALTER TABLE "rents" DROP COLUMN "idowner"`);
        await queryRunner.query(`ALTER TABLE "rents" DROP COLUMN "idbike"`);
        await queryRunner.query(`ALTER TABLE "rents" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rents" ADD "bikeId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rents" ADD CONSTRAINT "FK_81bc567fa332f1fffe1df4e9ae6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rents" ADD CONSTRAINT "FK_dd92549193bf2f91cac75dea5b6" FOREIGN KEY ("bikeId") REFERENCES "bikes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
