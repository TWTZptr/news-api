import * as dotenv from 'dotenv';
dotenv.config();
import { DataSource } from 'typeorm';
import { Init1689970887522 } from './1689970887522-init';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrations: [Init1689970887522],
});
