import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../typeorm/entities/Todo';
import {
  DtoTodoCreateService,
  DtoTodoEditService,
  DtoTodoGetList,
} from './dto.service';
import { TaskService } from '../task/task.service';
import { FilterService } from '../filter/filter.service';
import { SearchTodo } from '../typeorm/entities/SearchTodo';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly repo: Repository<Todo>,
    private readonly taskService: TaskService,
  ) {}

  create = async (todo: DtoTodoCreateService) => {
    const entity = this.repo.create(todo);
    const { id } = await this.repo.save(entity);
    return this.findOrError(id);
  };

  delete = async (id: number) => {
    const todo = await this.findOrError(id);
    await this.repo.remove(todo);
  };

  findOrError = async (id: number) => {
    const todo = await this.repo.findOne(id, {
      relations: ['tasks', 'filters'],
    });
    if (!todo) {
      throw new NotFoundException('Доска не найдена.');
    }
    return todo;
  };

  editTodo = async (todo: DtoTodoEditService) => {
    await this.taskService.delete(todo.id);
    const { id } = todo;
    const entity = await this.findOrError(id);
    const newEntity = await this.repo.merge(entity, todo);
    await this.repo.save(newEntity);
    return newEntity;
  };

  getList = async ({
    filterIds,
    page = 1,
    limit = 10,
    search,
  }: DtoTodoGetList) => {
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
      } else {
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

  // getPagination = (page: number, limit: number) => {
  //   console.log('hi');
  // };
}
