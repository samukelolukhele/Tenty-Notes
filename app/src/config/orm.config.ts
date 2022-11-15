import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  port: process.env.POSTGRES_PORT,
  host: process.env.POSTGRES_HOST,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  username: process.env.POSTGRES_USER,
  entities: [path.join(__dirname, '../**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '../migration/*{.ts,.js')],
  synchronize: true,
  ssl: true,
};
