import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { TareaModule } from './tarea/tarea.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { Tarea } from './tarea/entities/tarea.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: +process.env.DATABASE_PORT,
      password: process.env.DATABASE_PASSWORD,
      username: process.env.DATABASE_USERNAME,
      entities: [Usuario, Tarea],
      database: process.env.DATABASE_NAME,
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
