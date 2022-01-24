import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Todo } from './Todo';

@Entity('search_todos')
export class SearchTodo {
  @PrimaryGeneratedColumn()
  id!: number;
  @Index({ fulltext: true })
  @Column({ type: 'tsvector' })
  vector!: string;
  @Column({ name: 'todo_id' })
  todo_id!: number;
  @OneToOne(() => Todo, (todo) => todo.search)
  @JoinColumn({ name: 'todo_id', referencedColumnName: 'id' })
  todo!: Todo;
 
}
