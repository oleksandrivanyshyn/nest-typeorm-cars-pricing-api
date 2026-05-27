import { DataSourceOptions } from 'typeorm';

export const createTypeOrmOptions = (): DataSourceOptions => {
  const rootDir = process.cwd();
  const dbConfig: Record<string, unknown> = {
    synchronize: false,
    entities: [`${rootDir}/src/**/*.entity.{ts,js}`],
    migrations: [`${rootDir}/migrations/*{.ts,.js}`],
  };

  switch (process.env.NODE_ENV) {
    case 'development':
      Object.assign(dbConfig, {
        type: 'better-sqlite3',
        database: 'db.sqlite',
        migrationsRun: true,
      });
      break;
    case 'test':
      Object.assign(dbConfig, {
        type: 'better-sqlite3',
        database: 'test.sqlite',
        migrationsRun: true,
      });
      break;
    case 'production':
      break;
    default:
      throw new Error('unknown environment');
  }

  return dbConfig as unknown as DataSourceOptions;
};
