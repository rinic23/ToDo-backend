import { ConfigModuleOptions, registerAs } from '@nestjs/config';

export const appConfig = registerAs('config', () => ({
  db: {
    type: 'postgres' as 'postgres',
    host: process.env.POSTGRES_HOST!,
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER!,
    password: process.env.POSTGRES_PASSWORD!,
    database: process.env.POSTGRES_DB!,
  },
}));

export const configOptions: ConfigModuleOptions = {
  isGlobal: true,
  load: [appConfig],
  validationOptions: {
    whitelist: true,
    validationError: {
      target: false,
    },
  },
};
