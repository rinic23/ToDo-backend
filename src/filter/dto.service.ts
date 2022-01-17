import { PickType } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class DtoFilterService {
  @IsNumber()
  id!: number;
  @IsString()
  name!: string;
  @IsDate()
  created!: Date;
  @IsDate()
  updated!: Date;
}

export class DtoFilterCreateService extends PickType(DtoFilterService, [
  'name',
]) {}
