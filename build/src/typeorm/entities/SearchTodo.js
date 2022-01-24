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
exports.SearchTodo = void 0;
const typeorm_1 = require("typeorm");
const Todo_1 = require("./Todo");
let SearchTodo = class SearchTodo {
    id;
    vector;
    todo_id;
    todo;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SearchTodo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)({ fulltext: true }),
    (0, typeorm_1.Column)({ type: 'tsvector' }),
    __metadata("design:type", String)
], SearchTodo.prototype, "vector", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'todo_id' }),
    __metadata("design:type", Number)
], SearchTodo.prototype, "todo_id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Todo_1.Todo, (todo) => todo.search),
    (0, typeorm_1.JoinColumn)({ name: 'todo_id', referencedColumnName: 'id' }),
    __metadata("design:type", Todo_1.Todo)
], SearchTodo.prototype, "todo", void 0);
SearchTodo = __decorate([
    (0, typeorm_1.Entity)('search_todos')
], SearchTodo);
exports.SearchTodo = SearchTodo;
