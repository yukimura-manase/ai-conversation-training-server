import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class Kimera {
  @PrimaryGeneratedColumn('uuid')
  kimera_id: string;

  @Column('uuid')
  persona_id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image_url: string;

  @Column()
  like: string;

  @Column('text')
  personality: string;

  @Column('text')
  quirks: string;

  @Column('text')
  hobbies: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date | null;
}
