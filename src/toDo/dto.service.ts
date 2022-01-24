import { PickType } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
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

export class DtoTodoGetList {
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  filterIds!: number[];
  @IsOptional()
  @IsString()
  search!: string;
  @IsNumber()
  page!: number;
  @IsOptional()
  @IsNumber()
  limit!: number;
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
