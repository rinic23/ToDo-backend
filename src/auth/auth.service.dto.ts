import { IsIP, IsNumber, IsString } from 'class-validator';

export class DtoSessionCreate {
  @IsIP()
  address?: string;
  @IsString()
  agent!: string;
  @IsNumber()
  userId!: number;
}
