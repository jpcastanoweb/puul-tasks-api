import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { TareaModule } from './tarea/tarea.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { Tarea } from './tarea/entities/tarea.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: '',
      username: 'juanpablocastano',
      entities: [Usuario, Tarea],
      database: 'puul-tareas',
      synchronize: true,
      logging: true,
    }),
    UsuarioModule,
    TareaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
