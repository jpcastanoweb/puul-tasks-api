import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
export type UsuarioRolType = 'administrador' | 'miembro';

export interface UsuarioInterface {
  id: UsuarioId;
  nombre: string;
  correo: string;
  rol: UsuarioRolType;
}

export type UsuarioId = number;
@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: UsuarioId;

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
