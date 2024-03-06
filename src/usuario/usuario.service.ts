import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario, UsuarioInterface } from './entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioReporitory: Repository<Usuario>,
  ) {}

  /**
   * @description This service is responsible for creating a new Usuario.
   * It takes all needed parameters to then save it to memory.
   *
   * @param createUsuarioDto Parameters to create new Usuario
   * @returns Newly created Usuario
   */
  createUsuario(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const newUsuario: Usuario = new Usuario();
    newUsuario.nombre = createUsuarioDto.nombre;
    newUsuario.correo = createUsuarioDto.correo;
    newUsuario.rol = createUsuarioDto.rol;
    return this.usuarioReporitory.save(newUsuario);
  }

  /**
   * @description This service is responsible for listing matching Usuarios. It receives
   * Usuario properties to then filter the list of Usuarios and return to client.
   *
   * @param queryParams Parameters to filter Usuario search
   * @returns List of matching Usuarios
   */
  async getUsuarios(
    queryParams: Partial<UsuarioInterface>,
  ): Promise<Usuario[]> {
    // Get all existing Usuarios, adding to new columns for total count and monetary
    // cost of finished Tareas assigned to the Usuario
    let usersFound = await this.usuarioReporitory
      .createQueryBuilder('usuario')
      .leftJoin('usuario.tareas', 'tarea', "tarea.estado = 'terminada'")
      .addSelect('SUM(tarea.costoMonetario)', 'costo_total')
      .addSelect('COUNT(tarea.id)', 'tareas_terminadas')
      .groupBy('usuario.id')
      .getRawMany();

    // Filter results with Query Parameters
    usersFound = usersFound.filter((usuario) => {
      if (queryParams.rol && queryParams.rol !== usuario.usuario_rol)
        return false;
      if (queryParams.correo || queryParams.nombre) {
        if (
          queryParams.correo !== usuario.usuario_correo &&
          queryParams.nombre !== usuario.usuario_nombre
        )
          return false;
      }

      return true;
    });

    // Transform generated columns from strings to numbers
    usersFound.forEach((usuario) => {
      usuario.costo_total = parseInt(usuario.costo_total ?? 0);
      usuario.tareas_terminadas = parseInt(usuario.tareas_terminadas ?? 0);
    });

    return usersFound;
  }
}
