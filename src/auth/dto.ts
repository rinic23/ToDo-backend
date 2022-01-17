import { IsEmail, IsString } from 'class-validator';

export class DtoRegistrationPayload {
  @IsEmail()
  email!: string;
  @IsString()
  password!: string;
}
