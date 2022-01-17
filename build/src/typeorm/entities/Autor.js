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
exports.Autor = void 0;
const typeorm_1 = require("typeorm");
const Book_1 = require("./Book");
let Autor = class Autor {
    id;
    books;
    name;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Autor.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Book_1.Books, (book) => book.autors, { cascade: true }),
    (0, typeorm_1.JoinTable)({
        name: 'books_autor',
        joinColumn: { name: 'autor_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'books_id', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], Autor.prototype, "books", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Autor.prototype, "name", void 0);
Autor = __decorate([
    (0, typeorm_1.Entity)('autors')
], Autor);
exports.Autor = Autor;
