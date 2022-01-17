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
exports.Filter = void 0;
const typeorm_1 = require("typeorm");
const Todo_1 = require("./Todo");
let Filter = class Filter {
    id;
    created;
    updated;
    name;
    todo;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Filter.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Filter.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Filter.prototype, "updated", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Filter.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Todo_1.Todo, (todo) => todo.filters),
    __metadata("design:type", Array)
], Filter.prototype, "todo", void 0);
Filter = __decorate([
    (0, typeorm_1.Entity)('filters')
], Filter);
exports.Filter = Filter;
