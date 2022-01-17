"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const user_module_1 = require("./user/user.module");
const typeorm_module_1 = require("./typeorm/typeorm.module");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const app_config_1 = require("../app.config");
const toDo_module_1 = require("./toDo/toDo.module");
const task_module_1 = require("./task/task.module");
const filter_module_1 = require("./filter/filter.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(app_config_1.configOptions),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: typeorm_module_1.createDataBase,
                inject: [config_1.ConfigService],
                imports: [config_1.ConfigModule],
            }),
            toDo_module_1.ToDoModule,
            user_module_1.UserModule,
            task_module_1.TaskModule,
            filter_module_1.FilterModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
