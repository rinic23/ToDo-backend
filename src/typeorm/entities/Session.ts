import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users.sessions')
export class Session {
  @PrimaryGeneratedColumn()
  id!: number;
  @CreateDateColumn()
  created!: Date;
  @Column({ default: null, nullable: true, type: 'inet' })
  address!: string | null;
  @Column()
  agent!: string;
  @Column({ name: 'user_id' })
  userId!: number;
}
