import { UsuarioId } from 'src/usuario/entities/usuario.entity';

export class CreateTareaDto {
  titulo: string;
  descripcion: string;
  estimadoHoras: number;
  vencimiento: Date;
  estado: string;
  usuarios: UsuarioId[];
  costoMonetario: number;
}
