import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Todo } from './Todo';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  name!: string;
  @Column({ name: 'todo_id' })
  todoId!: number;
  @ManyToOne(() => Todo, (todo) => todo.tasks)
  @JoinColumn({ name: 'todo_id', referencedColumnName: 'id' })
  todo!: Todo;
  @CreateDateColumn()
  created!: Date;
  @UpdateDateColumn()
  updated!: Date;
}
