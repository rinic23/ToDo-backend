"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const Session_1 = require("../typeorm/entities/Session");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const jwt_service_1 = require("./jwt.service");
const jwt_strategy_1 = require("./jwt.strategy");
const user_module_1 = require("../user/user.module");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([Session_1.Session]), user_module_1.UserModule],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, jwt_service_1.JWTService, jwt_strategy_1.JwtStrategy],
        exports: [auth_service_1.AuthService, jwt_service_1.JWTService, jwt_strategy_1.JwtStrategy],
    })
], AuthModule);
exports.AuthModule = AuthModule;
