import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get<DataSourceOptions>('database.config');
        if (!dbConfig) {
          throw new Error('La configuración de la base de datos no se encontró')
        }
        return dbConfig;
      }
    })
  ],
})
export class DatabasesModule { }
