import { registerAs } from "@nestjs/config";
import { DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { join } from 'path';


export const pgConfig = (): DataSourceOptions => {
  return {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [join(__dirname, '..', '**', '*.entity{.ts,.js}')],
    synchronize: true,
    namingStrategy: new SnakeNamingStrategy()
  }
}

export default registerAs('database', () => ({
  config: pgConfig(),
}));