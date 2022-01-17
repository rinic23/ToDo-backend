import { UserModule } from './user/user.module';
import { createDataBase } from './typeorm/typeorm.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configOptions } from '../app.config';
import { ToDoModule } from './toDo/toDo.module';
import { TaskModule } from './task/task.module';
import { FilterModule } from './filter/filter.module';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    TypeOrmModule.forRootAsync({
      useFactory: createDataBase,
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    ToDoModule,
    UserModule,
    TaskModule,
    FilterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
