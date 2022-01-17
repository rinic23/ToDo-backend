import { PickType } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Filter } from '../typeorm/entities/Filter';

export class DtoTodo {
  @IsNumber()
  id!: number;
  @IsString()
  name!: string;
  @IsDate()
  created!: Date;
  @IsDate()
  updated!: Date;
  @IsNumber()
  userId!: number;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DtoTaskService)
  tasks!: DtoTaskService[];
  @IsArray()
  filters!: Filter[];
}

export class DtoTaskService {
  @IsString()
  name!: string;
}

export class DtoTodoCreateService extends PickType(DtoTodo, [
  'name',
  'userId',
  'tasks',
  'filters',
]) {}

export class DtoTodoEditService extends PickType(DtoTodo, [
  'name',
  'id',
  'tasks',
]) {}
