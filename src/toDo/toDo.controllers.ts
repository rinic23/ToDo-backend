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
  DtoTodoGetListController,
} from './dto.controllers';

@Controller('todo')
export class ToDoController {
  constructor(private todoService: TodoService) {}

  @Get('list')
  getList(@Query() query: DtoTodoGetListController) {
    return this.todoService.getList(query);
  }

  @Get(':id')
  getToDoList(@Param('id') id: number) {
    return this.todoService.findOrError(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  createToDo(
    @Body() todo: DtoTodoCreateController,
    @Request() { user }: { user: any },
  ) {
    return this.todoService.create({ ...todo, userId: user.user.id });
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteToDo(@Param() { id }: { id: number }) {
    return this.todoService.delete(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('update')
  editToDo(@Body() todo: DtoTodoEditController) {
    return this.todoService.editTodo(todo);
  }
}
