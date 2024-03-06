import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Put,
  Param,
  ParseIntPipe,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { TareaService } from './tarea.service';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { TareaId } from './entities/tarea.entity';

@Controller('tarea')
export class TareaController {
  constructor(private readonly tareaService: TareaService) {}

  /**
   * POST /tarea
   *
   * Create new Tarea
   *
   * @param createTareaDto Parameters to create a new Tarea
   * @returns
   */
  @Post()
  createTarea(@Body() createTareaDto: CreateTareaDto) {
    try {
      return this.tareaService.createTarea(createTareaDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  /**
   * GET /tarea
   *
   * Get all tareas or filter by title, due date or user ID
   *
   * @param titulo Filter results by Tarea title
   * @param vencimiento Filter results by vencimiento date
   * @param usuario Filter result by usuarioId
   * @returns List of tareas
   */
  @Get()
  getTareas(
    @Query('titulo') titulo?: string,
    @Query('vencimiento') vencimiento?: Date,
    @Query('usuario') usuario?: number,
    @Query('correo') correo?: string,
    @Query('nombre') nombre?: string,
  ) {
    try {
      return this.tareaService.getTareas({
        titulo,
        vencimiento,
        usuario,
        correo,
        nombre,
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  /**
   * PUT /tarea/:id
   *
   * Update an existing Tarea by id
   *
   * @param id Id of Tarea to update
   * @param updateTareaDto Properties to change
   * @returns Updated Tarea
   */
  @Put(':id')
  updateTarea(
    @Param('id', ParseIntPipe) id: TareaId,
    @Body() updateTareaDto: UpdateTareaDto,
  ) {
    try {
      return this.tareaService.updateTarea(id, updateTareaDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  /**
   * DELETE /tarea/:id
   *
   * Deletes an existing tarea by id
   *
   * @param id Id of Tarea to delete
   * @returns
   */
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: TareaId) {
    try {
      return this.tareaService.removeTarea(id);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  /**
   * GET /tarea/analitica
   *
   * Requests two statistics about the current Tareas
   *
   * @returns Analytics
   */
  @Get('analitica')
  getAnalitica() {
    try {
      return this.tareaService.getAnalitica();
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
