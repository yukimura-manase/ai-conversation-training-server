import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class AiFeedBack {
  @PrimaryGeneratedColumn('uuid')
  feedback_id: string;

  @Column('uuid')
  userId: string;

  @Column('uuid')
  chatRoomId: string;

  @Column('text')
  feedback: string;

  @Column('int')
  smile_rating: number;

  @Column('int')
  clear_conversation_rating: number;

  @Column('int')
  smooth_rating: number;

  @Column('int')
  manner_rating: number;

  @Column('int')
  like_rating: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
