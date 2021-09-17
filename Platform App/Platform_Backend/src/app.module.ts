import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EntityModule } from '../app/entity.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';
import * as ormconfig from './ormconfig'

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      migrationsRun: true,
      synchronize: true
    }),
    EntityModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}