"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configOptions = exports.appConfig = void 0;
const config_1 = require("@nestjs/config");
exports.appConfig = (0, config_1.registerAs)('config', () => ({
    db: {
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT) || 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
    },
}));
exports.configOptions = {
    isGlobal: true,
    load: [exports.appConfig],
    validationOptions: {
        whitelist: true,
        validationError: {
            target: false,
        },
    },
};
