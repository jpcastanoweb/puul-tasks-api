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
} from '@nestjs/common';
import { TareaService } from './tarea.service';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { TareaId } from './entities/tarea.entity';
//import { UpdateTareaDto } from './dto/update-tarea.dto';

@Controller('tarea')
export class TareaController {
  constructor(private readonly tareaService: TareaService) {}

  @Post()
  createTarea(@Body() createTareaDto: CreateTareaDto) {
    return this.tareaService.createTarea(createTareaDto);
  }

  @Get()
  getTareas(
    @Query('titulo') titulo?: string,
    @Query('correo') vencimiento?: Date,
    @Query('usuario') usuario?: number,
  ) {
    return this.tareaService.getTareas({
      titulo,
      vencimiento,
      usuario,
    });
  }

  @Put(':id')
  updateTarea(
    @Param('id', ParseIntPipe) id: TareaId,
    @Body() updateTareaDto: UpdateTareaDto,
  ) {
    return this.tareaService.updateTarea(id, updateTareaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: TareaId) {
    return this.tareaService.removeTarea(id);
  }

  @Get('analitica')
  getAnalitica() {
    return this.tareaService.getAnalitica();
  }
}
