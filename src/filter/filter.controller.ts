import { Body, Controller, Get, Post } from '@nestjs/common';
import { DtoFilterCreateController } from './dto.controller';
import { FilterService } from './filter.service';

@Controller('filters')
export class FilterController {
  constructor(private filterService: FilterService) {}
  @Post('create')
  async create(@Body() filter: DtoFilterCreateController) {
    return await this.filterService.create(filter);
  }
  @Get('list')
  async getFilterList() {
    return await this.filterService.filterList();
  }
}
