import { UsuarioRolType } from '../entities/usuario.entity';

export class CreateUsuarioDto {
  nombre: string;
  correo: string;
  rol: UsuarioRolType;
}
