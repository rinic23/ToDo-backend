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
exports.FilterService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Filter_1 = require("../typeorm/entities/Filter");
let FilterService = class FilterService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    create = async (filter) => {
        const entity = this.repo.create(filter);
        return await this.repo.save(entity);
    };
    findAll = async (filtersId) => {
        const filters = await this.repo.find({ where: filtersId });
        return filters;
    };
    filterList = async () => {
        return await this.repo
            .createQueryBuilder('f')
            .innerJoinAndSelect('f.todo', 't')
            // .select('t.id', 'id')
            // .addSelect('t.name', 'name')
            // .addSelect('count(f.id)::int', 'filterCount')
            // .groupBy('t.id')
            .getMany();
    };
};
FilterService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Filter_1.Filter)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FilterService);
exports.FilterService = FilterService;
