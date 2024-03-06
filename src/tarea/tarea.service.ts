import { Injectable } from '@nestjs/common';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { Tarea, TareaId } from './entities/tarea.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ArrayContains, Repository } from 'typeorm';
import { Usuario, UsuarioId } from 'src/usuario/entities/usuario.entity';
import { UpdateTareaDto } from './dto/update-tarea.dto';

@Injectable()
export class TareaService {
  constructor(
    @InjectRepository(Tarea)
    private readonly tareaRepository: Repository<Tarea>,
  ) {}

  createTarea(createTareaDto: CreateTareaDto): Promise<Tarea> {
    const newTarea: Tarea = new Tarea();
    newTarea.titulo = createTareaDto.titulo;
    newTarea.descripcion = createTareaDto.descripcion;
    newTarea.estimadoHoras = createTareaDto.estimadoHoras;
    newTarea.vencimiento = createTareaDto.vencimiento;
    newTarea.estado = createTareaDto.estado;
    newTarea.costoMonetario = createTareaDto.costoMonetario;
    newTarea.createdDate = new Date();

    newTarea.usuarios = createTareaDto.usuarios.map((id) => ({
      ...new Usuario(),
      id,
    }));

    return this.tareaRepository.save(newTarea);
  }

  getTareas(queryParams: {
    vencimiento: Date;
    titulo: string;
    usuario: UsuarioId;
  }): Promise<Tarea[]> {
    if (queryParams.vencimiento || queryParams.titulo || queryParams.usuario) {
      return this.tareaRepository.find({
        relations: {
          usuarios: true,
        },
        where: {
          vencimiento: queryParams.vencimiento,
          titulo: queryParams.titulo,
          usuarios: ArrayContains([queryParams.usuario]),
        },
        order: {
          createdDate: 'ASC',
        },
      });
    } else {
      return this.tareaRepository.find({
        relations: { usuarios: true },
        order: { createdDate: 'ASC' },
      });
    }
  }

  updateTarea(id: number, updateTareaDto: UpdateTareaDto): Promise<Tarea> {
    const tarea: Tarea = new Tarea();
    tarea.titulo = updateTareaDto.titulo;
    tarea.descripcion = updateTareaDto.descripcion;
    tarea.estimadoHoras = updateTareaDto.estimadoHoras;
    tarea.vencimiento = updateTareaDto.vencimiento;
    tarea.estado = updateTareaDto.estado;
    tarea.costoMonetario = updateTareaDto.costoMonetario;
    tarea.id = id;

    if (tarea.usuarios)
      tarea.usuarios = updateTareaDto.usuarios.map((id) => ({
        ...new Usuario(),
        id,
      }));

    return this.tareaRepository.save(tarea);
  }

  removeTarea(id: TareaId) {
    return this.tareaRepository.delete(id);
  }
}
