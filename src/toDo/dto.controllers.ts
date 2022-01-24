import { PickType } from '@nestjs/swagger';
import {
  DtoTodoCreateService,
  DtoTodoEditService,
  DtoTodoGetList,
} from './dto.service';

export class DtoTodoEditController extends DtoTodoEditService {}

export class DtoTodoCreateController extends PickType(DtoTodoCreateService, [
  'name',
  'tasks',
  'filters',
]) {}

export class DtoTodoGetListController extends DtoTodoGetList {}
