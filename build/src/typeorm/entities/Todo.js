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
exports.Todo = void 0;
const typeorm_1 = require("typeorm");
const Filter_1 = require("./Filter");
const SearchTodo_1 = require("./SearchTodo");
const Task_1 = require("./Task");
let Todo = class Todo {
    id;
    name;
    created;
    updated;
    userId;
    tasks;
    filters;
    search;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Todo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Todo.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Todo.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Todo.prototype, "updated", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", Number)
], Todo.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Task_1.Task, (task) => task.todo, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: 'id', referencedColumnName: 'todo_id' }),
    __metadata("design:type", Array)
], Todo.prototype, "tasks", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Filter_1.Filter, (filter) => filter.todo, { cascade: true }),
    (0, typeorm_1.JoinTable)({
        name: 'filters_todos',
        joinColumn: { name: 'todo_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'filter_id', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], Todo.prototype, "filters", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => SearchTodo_1.SearchTodo, (search) => search.todo, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: 'id', referencedColumnName: 'todo_id' }),
    __metadata("design:type", SearchTodo_1.SearchTodo)
], Todo.prototype, "search", void 0);
Todo = __decorate([
    (0, typeorm_1.Entity)('todos')
], Todo);
exports.Todo = Todo;
