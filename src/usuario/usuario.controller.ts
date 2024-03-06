import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UsuarioRolType } from './entities/usuario.entity';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  /**
   * POST /usuario
   *
   * Create a new Usuario
   *
   * @param createUsuarioDto Parameters for creating a new Usuario
   * @returns
   */
  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    try {
      return this.usuarioService.createUsuario(createUsuarioDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  /**
   * GET /usuario
   *
   * Get all Usuarios or filter by name, email or role
   * @param nombre Filter by Usuario name
   * @param correo Filter result by Usuario email address
   * @param rol Filter by Usuario role
   * @returns
   */
  @Get()
  getUsuarios(
    @Query('nombre') nombre?: string,
    @Query('correo') correo?: string,
    @Query('rol') rol?: UsuarioRolType,
  ) {
    try {
      return this.usuarioService.getUsuarios({
        nombre,
        correo,
        rol,
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
