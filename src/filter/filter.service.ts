import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { async } from 'rxjs';
import { Repository } from 'typeorm';
import { Filter } from '../typeorm/entities/Filter';
import { DtoFilterCreateService } from './dto.service';

@Injectable()
export class FilterService {
  constructor(
    @InjectRepository(Filter) private readonly repo: Repository<Filter>,
  ) {}

  create = async (filter: DtoFilterCreateService) => {
    const entity = this.repo.create(filter);
    return await this.repo.save(entity);
  };
  findAll = async (filtersId: { id: number }[]) => {
    const filters = await this.repo.find({ where: filtersId });
    return filters;
  };

  filterList = async () => {
    return await this.repo
      .createQueryBuilder('f')
      .innerJoinAndSelect('f.todo', 't')
      // .select('t.id', 'id')
      // .addSelect('t.name', 'name')
      // .addSelect('count(f.id)::int', 'filterCount')
      // .groupBy('t.id')
      .getMany();
  };
}
