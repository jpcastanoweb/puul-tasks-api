import { UsuarioId } from 'src/usuario/entities/usuario.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type TareaId = number;
export interface TareaInterface {
  id: TareaId;
  titulo: string;
  descripcion: string;
  estimadoHoras: number;
  vencimiento: Date;
  estado: string;
  usuarios: UsuarioId[];
  costoMonetario: number;
}
@Entity()
export class Tarea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column()
  estimadoHoras: number;

  @Column()
  vencimiento: Date;

  @Column({
    type: 'enum',
    enum: ['activa', 'terminada'],
    default: 'activa',
  })
  estado: string;

  @Column('int', { array: true })
  usuarios: UsuarioId[];

  @Column()
  costoMonetario: number;
}
