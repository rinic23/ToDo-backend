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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const auth_service_1 = require("./auth.service");
const dto_1 = require("./dto");
const jwt_service_1 = require("./jwt.service");
let AuthController = class AuthController {
    userService;
    authService;
    jwtService;
    constructor(userService, authService, jwtService) {
        this.userService = userService;
        this.authService = authService;
        this.jwtService = jwtService;
    }
    async userRegistration(userData, agent, address) {
        const user = await this.userService.registration(userData);
        const { id } = user;
        const { id: sessionId } = await this.authService.create({
            agent,
            address,
            userId: id,
        });
        return this.jwtService.generate(sessionId);
    }
};
__decorate([
    (0, common_1.Post)('registration'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('user-agent')),
    __param(2, (0, common_1.Headers)('x-forwarded-for')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.DtoRegistrationPayload, String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userRegistration", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService,
        jwt_service_1.JWTService])
], AuthController);
exports.AuthController = AuthController;
