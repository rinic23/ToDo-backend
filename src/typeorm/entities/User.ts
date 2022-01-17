import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users.users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  name!: string;
  @Column()
  surname!: string;
  @Column({ name: 'last_name' })
  lastName!: string;
  @Column()
  password!: string;
  @Column()
  email!: string;
  @CreateDateColumn()
  created!: Date;
  @UpdateDateColumn()
  updated!: Date;
}
