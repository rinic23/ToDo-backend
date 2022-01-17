import { DtoRegistration } from './user.service.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../typeorm/entities/User';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}
  registration = async (userData: DtoRegistration) => {
    console.log(userData);
    const { email } = userData;
    await this.userEmailCheck(email);
    const user = this.repo.create(userData);
    return this.repo.save(user);
  };

  userEmailCheck = async (email: string) => {
    const user = await this.repo.findOne({ email });
    if (user) {
      throw new NotFoundException(
        `Пользователь c email ${email} уже существует`,
      );
    }
  };

  findUserByIdExist = async (id: number) => {
    const user = await this.repo.findOne(id);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    return user;
  };
}
