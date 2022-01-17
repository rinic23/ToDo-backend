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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DtoTodoEditService = exports.DtoTodoCreateService = exports.DtoTaskService = exports.DtoTodo = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class DtoTodo {
    id;
    name;
    created;
    updated;
    userId;
    tasks;
    filters;
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DtoTodo.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DtoTodo.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], DtoTodo.prototype, "created", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], DtoTodo.prototype, "updated", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DtoTodo.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => DtoTaskService),
    __metadata("design:type", Array)
], DtoTodo.prototype, "tasks", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], DtoTodo.prototype, "filters", void 0);
exports.DtoTodo = DtoTodo;
class DtoTaskService {
    name;
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DtoTaskService.prototype, "name", void 0);
exports.DtoTaskService = DtoTaskService;
class DtoTodoCreateService extends (0, swagger_1.PickType)(DtoTodo, [
    'name',
    'userId',
    'tasks',
    'filters',
]) {
}
exports.DtoTodoCreateService = DtoTodoCreateService;
class DtoTodoEditService extends (0, swagger_1.PickType)(DtoTodo, [
    'name',
    'id',
    'tasks',
]) {
}
exports.DtoTodoEditService = DtoTodoEditService;
