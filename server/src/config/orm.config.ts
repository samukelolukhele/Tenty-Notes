import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  port: process.env.POSTGRES_PORT,
  host: process.env.POSTGRES_HOST,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  username: process.env.POSTGRES_USER,
  entities: [__dirname + '/../**/*.entity.js'],
};
