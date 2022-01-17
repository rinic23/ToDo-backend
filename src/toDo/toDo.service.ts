import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../typeorm/entities/Todo';
import { DtoTodoCreateService, DtoTodoEditService } from './dto.service';
import { TaskService } from '../task/task.service';
import { FilterService } from '../filter/filter.service';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly repo: Repository<Todo>,
    private readonly taskRepo: TaskService,
    private readonly filterService: FilterService,
  ) {}

  create = async (todo: DtoTodoCreateService) => {
    // const { filters } = todo;
    // const filtersArray = await this.filterService.findAll(filters);
    console.log(todo);
    const entity = this.repo.create(todo);
    console.log(entity);
    const { id } = await this.repo.save(entity);
    return this.find(id);
  };

  delete = async (id: number) => {
    const todo = await this.find(id);
    await this.repo.remove(todo);
    console.log(id);
  };

  find = async (id: number) => {
    const todo = await this.repo.findOne(
      { id },
      { relations: ['tasks', 'filters'] },
    );
    if (!todo) {
      throw new NotFoundException(
        'Доска которую вы хотите удалить не найдена.',
      );
    }
    return { ...todo };
  };

  editTodo = async (todo: DtoTodoEditService) => {
    await this.taskRepo.delete(todo.id);
    const { id } = todo;
    const entity = await this.find(id);
    const newEntity = await this.repo.merge(entity, todo);
    await this.repo.save(newEntity);
    return newEntity;
  };

  // list = async (filterIds: number[]) => {
  //   console.log(filterIds);
  //   return this.repo
  //     .createQueryBuilder('todos')
  //     .innerJoin('todos.filters', 'filters')
  //     .where('filters.id in (...:filtersIds)', { filterIds })
  //     .getMany();
  // };
}
