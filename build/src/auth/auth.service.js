"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Session_1 = require("../typeorm/entities/Session");
const user_service_1 = require("../user/user.service");
let AuthService = class AuthService {
    repo;
    userService;
    constructor(repo, userService) {
        this.repo = repo;
        this.userService = userService;
    }
    create = async (session) => {
        const entity = this.repo.create(session);
        return this.repo.save(entity);
    };
    authenticateUser = async (id) => {
        const session = await this.repo.findOne(id);
        if (!session) {
            throw new common_1.NotFoundException('Сессия не найдена');
        }
        const { userId } = session;
        const user = await this.userService.findUserByIdExist(userId);
        return user;
    };
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Session_1.Session)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;
