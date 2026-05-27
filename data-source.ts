import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { createTypeOrmOptions } from './src/typeorm.config';

export default new DataSource(createTypeOrmOptions());
