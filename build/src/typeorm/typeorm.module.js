"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDataBase = void 0;
const path_1 = require("path");
const createDataBase = (configService) => {
    const config = configService.get('config');
    const { port, host, database, password, username, type } = config.db;
    return {
        host,
        port,
        database,
        password,
        username,
        type,
        migrations: [(0, path_1.join)(__dirname, 'migrations/*{.ts,.js}')],
        entities: [(0, path_1.join)(__dirname, 'entities/*{.ts,.js}')],
        migrationsRun: true,
        synchronize: false,
        logging: 'all',
    };
};
exports.createDataBase = createDataBase;
