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
exports.TodoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Todo_1 = require("../typeorm/entities/Todo");
const task_service_1 = require("../task/task.service");
let TodoService = class TodoService {
    repo;
    taskService;
    constructor(repo, taskService) {
        this.repo = repo;
        this.taskService = taskService;
    }
    create = async (todo) => {
        const entity = this.repo.create(todo);
        const { id } = await this.repo.save(entity);
        return this.findOrError(id);
    };
    delete = async (id) => {
        const todo = await this.findOrError(id);
        await this.repo.remove(todo);
    };
    findOrError = async (id) => {
        const todo = await this.repo.findOne(id, {
            relations: ['tasks', 'filters'],
        });
        if (!todo) {
            throw new common_1.NotFoundException('Доска не найдена.');
        }
        return todo;
    };
    editTodo = async (todo) => {
        await this.taskService.delete(todo.id);
        const { id } = todo;
        const entity = await this.findOrError(id);
        const newEntity = await this.repo.merge(entity, todo);
        await this.repo.save(newEntity);
        return newEntity;
    };
    getList = async ({ filterIds, page = 1, limit = 10, search, }) => {
        const skipRecordsCount = page * limit - limit;
        const todosQueryBuilder = await this.repo
            .createQueryBuilder('todo')
            .innerJoinAndSelect('todo.filters', 'filters')
            .leftJoinAndSelect('todo.tasks', 'tasks')
            .setParameters({ filterIds, search });
        if (search) {
            todosQueryBuilder
                .innerJoin('todo.search', 'search_todo')
                .addSelect('ts_rank(vector, to_tsquery(:search))', 'rank')
                .where('search_todo.vector @@ to_tsquery(:search)', {
                search: `${search}:*`,
            })
                .orderBy('rank', 'DESC')
                .addOrderBy('vector', 'ASC')
                .addOrderBy('todo.name', 'ASC');
        }
        if (filterIds) {
            if (Array.isArray(filterIds)) {
                todosQueryBuilder.andWhere('filters.id in (:...filterIds)');
            }
            else {
                todosQueryBuilder.andWhere('filters.id = :filterIds');
            }
        }
        todosQueryBuilder.offset(skipRecordsCount).limit(limit);
        const data = await todosQueryBuilder.getMany();
        const totalCount = await todosQueryBuilder.getCount();
        return {
            data,
            pagination: {
                totalCount,
                page,
                limit,
            },
        };
    };
};
TodoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Todo_1.Todo)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        task_service_1.TaskService])
], TodoService);
exports.TodoService = TodoService;
