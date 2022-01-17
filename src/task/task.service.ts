import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../typeorm/entities/Task';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly repo: Repository<Task>,
  ) {}
  findAll = async (todoId: number) => await this.repo.find({ todoId });
  delete = async (todoId: number) => await this.repo.delete({ todoId });
}
