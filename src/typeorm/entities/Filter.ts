import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Todo } from './Todo';

@Entity('filters')
export class Filter {
  @PrimaryGeneratedColumn()
  id!: number;
  @CreateDateColumn()
  created!: Date;
  @UpdateDateColumn()
  updated!: Date;
  @Column()
  name!: string;
  @ManyToMany(() => Todo, (todo) => todo.filters)
  todo!: Todo[];
}
