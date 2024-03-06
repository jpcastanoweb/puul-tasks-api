import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
//import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Usuario,
  UsuarioInterface,
  UsuarioRolType,
} from './entities/usuario.entity';
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

  getUsuariosByNombreOrCorreo(
    queryParams: Partial<UsuarioInterface>,
  ): Promise<Usuario[]> {
    const foundUsuarios = this.usuarioReporitory.find({
      where: [{ nombre: queryParams.nombre }, { correo: queryParams.correo }],
    });

    return foundUsuarios;
  }

  getUsuariosByRol(rol: UsuarioRolType): Promise<Usuario[]> {
    return this.usuarioReporitory.find({
      where: {
        rol: rol,
      },
    });
  }

  getUsuarios(): Promise<Usuario[]> {
    return this.usuarioReporitory.find();
  }
}
