"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DtoTodoCreateController = exports.DtoTodoEditController = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_service_1 = require("./dto.service");
class DtoTodoEditController extends dto_service_1.DtoTodoEditService {
}
exports.DtoTodoEditController = DtoTodoEditController;
class DtoTodoCreateController extends (0, swagger_1.PickType)(dto_service_1.DtoTodoCreateService, [
    'name',
    'tasks',
    'filters',
]) {
}
exports.DtoTodoCreateController = DtoTodoCreateController;
