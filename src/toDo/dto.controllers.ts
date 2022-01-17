import { PickType } from '@nestjs/swagger';
import { DtoTodoCreateService, DtoTodoEditService } from './dto.service';

export class DtoTodoEditController extends DtoTodoEditService {}

export class DtoTodoCreateController extends PickType(DtoTodoCreateService, [
  'name',
  'tasks',
  'filters',
]) {}
