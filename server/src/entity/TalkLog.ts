import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class TalkLog {
  @PrimaryGeneratedColumn('uuid')
  talk_log_id: string;

  @Column('uuid')
  chat_room_id: number;

  @Column()
  user_talk: string;

  @Column()
  ai_talk: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
