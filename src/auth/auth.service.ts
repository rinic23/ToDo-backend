import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from '../typeorm/entities/Session';
import { UserService } from '../user/user.service';
import { DtoSessionCreate } from './auth.service.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Session) private readonly repo: Repository<Session>,
    private readonly userService: UserService,
  ) {}

  create = async (session: DtoSessionCreate) => {
    const entity = this.repo.create(session);
    return this.repo.save(entity);
  };

  authenticateUser = async (id: number) => {
    const session = await this.repo.findOne(id);
    if (!session) {
      throw new NotFoundException('Сессия не найдена');
    }
    const { userId } = session;
    const user = await this.userService.findUserByIdExist(userId);
    return user;
  };
}
