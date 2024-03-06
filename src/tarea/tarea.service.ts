import { Injectable } from '@nestjs/common';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { AnaliticaInterface, Tarea, TareaId } from './entities/tarea.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ArrayContains, Between, Repository } from 'typeorm';
import { Usuario, UsuarioId } from 'src/usuario/entities/usuario.entity';
import { UpdateTareaDto } from './dto/update-tarea.dto';

@Injectable()
export class TareaService {
  constructor(
    @InjectRepository(Tarea)
    private readonly tareaRepository: Repository<Tarea>,
  ) {}

  /**
   * @description This service is responsible for creating a new Tarea. It receives all
   * properties to then map them to a new instance of Tarea. Then it saves it to storage.
   *
   * @param createTareaDto Parameters to create new Tarea
   * @returns Newly created Tarea
   */
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

  /**
   * @description This service is responsible for listing matching Tarea. It receives
   * Tarea properties to then filter the list of Tareas and return to client.
   *
   * @param queryParams Paramaters to filter Tarea search.
   * @returns List of matching Tareas.
   */
  getTareas(queryParams: {
    vencimiento: Date;
    titulo: string;
    usuario: UsuarioId;
  }): Promise<Tarea[]> {
    // If there are any filter queries, provide them to the repository .find method.
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
      // If no filters queries, return all Tareas
    } else {
      return this.tareaRepository.find({
        relations: { usuarios: true },
        order: { createdDate: 'ASC' },
      });
    }
  }

  /**
   * This service is responsible for updating an existing Tarea. It maps the
   * new values to an instance of Tarea and then saves it to memory.
   *
   * @param id Tarea ID to be updated
   * @param updateTareaDto Tarea parameters to be updated
   * @returns Updated Tarea
   */
  updateTarea(id: number, updateTareaDto: UpdateTareaDto): Promise<Tarea> {
    const tarea: Tarea = new Tarea();
    tarea.titulo = updateTareaDto.titulo;
    tarea.descripcion = updateTareaDto.descripcion;
    tarea.estimadoHoras = updateTareaDto.estimadoHoras;
    tarea.vencimiento = updateTareaDto.vencimiento;
    tarea.estado = updateTareaDto.estado;
    tarea.costoMonetario = updateTareaDto.costoMonetario;
    tarea.id = id;

    // If we have a new set of assigned users IDs, map the new userIDs with Usuarios
    if (tarea.usuarios)
      tarea.usuarios = updateTareaDto.usuarios.map((id) => ({
        ...new Usuario(),
        id,
      }));

    return this.tareaRepository.save(tarea);
  }

  /**
   *
   * @param id Tarea ID to delete
   * @returns
   */
  removeTarea(id: TareaId) {
    return this.tareaRepository.delete(id);
  }

  /**
   *
   * Creates the following two analytics:
   *
   * 1. Cantidad de Tareas Urgentes: Arreglo con tareas con vencimiento en menos de 5 días.
   * 2. Costo monetario total de tareas activas: Suma del costo monetario de todas las tareas con "estado" de "activa"
   *
   * @returns Object with analytics
   */
  async getAnalitica(): Promise<AnaliticaInterface> {
    // Limit date is 5 days from today
    const limitDay = new Date();
    limitDay.setDate(limitDay.getDate() + 5);

    const analitica: AnaliticaInterface = {
      // Tareas Urgentes: Uses repository .findAndCount to count the resulting rows of the query
      tareasUrgentes: await this.tareaRepository.findAndCount({
        where: {
          vencimiento: Between(new Date(), limitDay),
        },
      }),
      // Costo Tareas Activas: Uses createQueryBuilder to create a new column that sums the cost of all active Tareas
      costoTareasActivas: await this.tareaRepository
        .createQueryBuilder('tarea')
        .select('SUM(tarea.costoMonetario)', 'costo')
        .where('tarea.estado = :estado', { estado: 'activa' })
        .getRawOne(),
    };

    return analitica;
  }
}
