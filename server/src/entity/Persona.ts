import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Persona {
  @PrimaryGeneratedColumn('uuid')
  persona_id: string;

  @Column()
  type: string;
}
