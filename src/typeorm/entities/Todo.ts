import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Filter } from './Filter';
import { Task } from './Task';

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  name!: string;
  @CreateDateColumn()
  created!: Date;
  @UpdateDateColumn()
  updated!: Date;
  @Column({ name: 'user_id' })
  userId!: number;
  @OneToMany(() => Task, (task) => task.todo, { cascade: true })
  @JoinColumn({ name: 'id', referencedColumnName: 'todo_id' })
  tasks!: Task[];
  @ManyToMany(() => Filter, (filter) => filter.todo, { cascade: true })
  @JoinTable({
    name: 'filters_todos',
    joinColumn: { name: 'todo_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'filter_id', referencedColumnName: 'id' },
  })
  filters!: Filter[];
}

