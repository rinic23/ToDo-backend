import { TodoService } from './toDo.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  DtoTodoCreateController,
  DtoTodoEditController,
} from './dto.controllers';

@Controller('todo')
export class ToDoController {
  constructor(private todoService: TodoService) {}

  @Get(':id')
  getToDoList(@Param('id') id: number) {
    return this.todoService.find(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async createToDo(
    @Body() todo: DtoTodoCreateController,
    @Request() { user }: { user: any },
  ) {
    return this.todoService.create({ ...todo, userId: user.user.id });
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteToDo(@Param() { id }: { id: number }) {
    return this.todoService.delete(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/update')
  async editToDo(@Body() todo: DtoTodoEditController) {
    return await this.todoService.editTodo(todo);
  }

  // @UseGuards(AuthGuard('jwt'))
  // @Get('list')
  // async getToDo() {
  //   // console.log('controller', filterIds);
  //   // return await this.todoService.list(filterIds);
  //   return 'hi';
  // }
}
