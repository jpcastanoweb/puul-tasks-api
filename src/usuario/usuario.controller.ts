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

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    try {
      return this.usuarioService.createUsuario(createUsuarioDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Get()
  getUsuarios(
    @Query('nombre') nombre?: string,
    @Query('correo') correo?: string,
    @Query('rol') rol?: UsuarioRolType,
  ) {
    return this.usuarioService.getUsuarios({
      nombre,
      correo,
      rol,
    });
  }
}
