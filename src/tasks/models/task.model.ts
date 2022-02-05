import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 2500 })
  summary: string;

  @Column()
  userId: number;

  @CreateDateColumn()
  performedAt?: Date;
}
