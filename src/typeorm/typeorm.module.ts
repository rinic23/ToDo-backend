import { ConfigService, ConfigType } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { appConfig } from '../../app.config';

export const createDataBase = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const config = <ConfigType<typeof appConfig>>configService.get('config');
  const { port, host, database, password, username, type } = config.db;
  return {
    host,
    port,
    database,
    password,
    username,
    type,
    migrations: [join(__dirname, 'migrations/*{.ts,.js}')],
    entities: [join(__dirname, 'entities/*{.ts,.js}')],
    migrationsRun: true,
    synchronize: false,
    logging: 'all',
  };
};
