import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaUpdate1726917157461 implements MigrationInterface {
  name = 'SchemaUpdate1726917157461';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "ai_feed_back" ("feedback_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "chatRoomId" uuid NOT NULL, "feedback" text NOT NULL, "smile_rating" integer NOT NULL, "clear_conversation_rating" integer NOT NULL, "smooth_rating" integer NOT NULL, "manner_rating" integer NOT NULL, "like_rating" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5bcc103bba224822991309d17a6" PRIMARY KEY ("feedback_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "talk_log" ("talk_log_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "chat_room_id" uuid NOT NULL, "user_talk" character varying NOT NULL, "ai_talk" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ac1d1266597a3191dfabdcef862" PRIMARY KEY ("talk_log_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "talk_theme" ("talk_theme_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "kimera_id" uuid NOT NULL, "talk_theme" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4d6c9c455ea9efcf059843be913" PRIMARY KEY ("talk_theme_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "persona" ("persona_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying NOT NULL, CONSTRAINT "PK_8a0e852b4c8cda8b92af46b6586" PRIMARY KEY ("persona_id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "persona"`);
    await queryRunner.query(`DROP TABLE "talk_theme"`);
    await queryRunner.query(`DROP TABLE "talk_log"`);
    await queryRunner.query(`DROP TABLE "ai_feed_back"`);
  }
}
