import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../typeorm/entities/Task';
import { TaskService } from './task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
