import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('personas')
export class Persona {
  @PrimaryGeneratedColumn('uuid')
  persona_id: string;

  @Column()
  type: string;
}
