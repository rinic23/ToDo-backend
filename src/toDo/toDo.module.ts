import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { FilterModule } from '../filter/filter.module';
import { TaskModule } from '../task/task.module';
import { Todo } from '../typeorm/entities/Todo';
import { ToDoController } from './toDo.controllers';
import { TodoService } from './toDo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo]),
    AuthModule,
    TaskModule,
    FilterModule,
  ],
  controllers: [ToDoController],
  providers: [TodoService],
})
export class ToDoModule {}
