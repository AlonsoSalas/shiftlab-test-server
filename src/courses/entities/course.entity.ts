import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Result } from '../../results/entities/result.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Result, (result) => result.course)
  results: Result[];
}
