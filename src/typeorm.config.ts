import { DataSourceOptions } from 'typeorm';

export const createTypeOrmOptions = (): DataSourceOptions => {
  const rootDir = process.cwd();
  const dbConfig: Record<string, unknown> = {
    synchronize: false,
  };

  switch (process.env.NODE_ENV) {
    case 'development':
      Object.assign(dbConfig, {
        type: 'better-sqlite3',
        database: 'db.sqlite',
        entities: [`${rootDir}/src/**/*.entity.{ts,js}`],
        migrations: [`${rootDir}/migrations/*.ts`],
        migrationsRun: true,
      });
      break;
    case 'test':
      Object.assign(dbConfig, {
        type: 'better-sqlite3',
        database: 'test.sqlite',
        entities: [`${rootDir}/src/**/*.entity.{ts,js}`],
        migrations: [`${rootDir}/migrations/*.ts`],
        migrationsRun: true,
      });
      break;
    case 'production':
      Object.assign(dbConfig, {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        entities: [`${rootDir}/dist/**/*.entity.js`],
        migrations: [`${rootDir}/migrations/*.js`],
        migrationsRun: true,
        ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : false,
      });
      break;
    default:
      throw new Error('unknown environment');
  }

  return dbConfig as unknown as DataSourceOptions;
};
