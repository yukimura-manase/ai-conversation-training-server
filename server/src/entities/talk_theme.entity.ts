import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class TalkTheme {
  @PrimaryGeneratedColumn('uuid')
  talk_theme_id: string;

  @Column('uuid')
  kimera_id: string;

  @Column()
  talk_theme: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}
