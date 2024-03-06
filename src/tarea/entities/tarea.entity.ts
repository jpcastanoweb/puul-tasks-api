import { Usuario } from 'src/usuario/entities/usuario.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export type TareaId = number;
export interface TareaInterface {
  id: TareaId;
  titulo: string;
  descripcion: string;
  estimadoHoras: number;
  vencimiento: Date;
  estado: string;
  usuarios: Usuario[];
  costoMonetario: number;
  createdDate?: Date;
}

/**
 * Interface and Types for Analitica Entry Point
 */
export interface AnaliticaInterface {
  tareasUrgentes: TareasUrgentes;
  costoTareasActivas: CostoTareasActivas;
}

type TareasUrgentes = [Tarea[], number];
type CostoTareasActivas = {
  costo: number;
};

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

  @ManyToMany(() => Usuario, (Usuario) => Usuario.tareas)
  @JoinTable()
  usuarios: Usuario[];

  @Column()
  costoMonetario: number;

  @Column()
  createdDate?: Date;
}
