import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
export type UsuarioRolType = 'administrador' | 'miembro';

export interface UsuarioInterface {
  id: number;
  nombre: string;
  correo: string;
  rol: UsuarioRolType;
}
@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  correo: string;

  @Column({
    type: 'enum',
    enum: ['administrador', 'miembro'],
    default: 'miembro',
  })
  rol: UsuarioRolType;
}
