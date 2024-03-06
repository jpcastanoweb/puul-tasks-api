import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
//import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario, UsuarioInterface } from './entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioReporitory: Repository<Usuario>,
  ) {}

  createUsuario(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const newUsuario: Usuario = new Usuario();
    newUsuario.nombre = createUsuarioDto.nombre;
    newUsuario.correo = createUsuarioDto.correo;
    newUsuario.rol = createUsuarioDto.rol;
    return this.usuarioReporitory.save(newUsuario);
  }

  async getUsuarios(
    queryParams: Partial<UsuarioInterface>,
  ): Promise<Usuario[]> {
    let usersFound = await this.usuarioReporitory
      .createQueryBuilder('usuario')
      .leftJoin('usuario.tareas', 'tarea', "tarea.estado = 'terminada'")
      .addSelect('SUM(tarea.costoMonetario)', 'costo_total')
      .addSelect('COUNT(tarea.id)', 'tareas_terminadas')
      .groupBy('usuario.id')
      .getRawMany();

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

    usersFound.forEach((usuario) => {
      usuario.costo_total = parseInt(usuario.costo_total ?? 0);
      usuario.tareas_terminadas = parseInt(usuario.tareas_terminadas ?? 0);
    });

    return usersFound;
  }
}
