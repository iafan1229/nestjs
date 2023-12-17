import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1702818342503 implements MigrationInterface {
    name = 'Migration1702818342503'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" RENAME COLUMN "contents" TO "content"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" RENAME COLUMN "content" TO "contents"`);
    }

}
