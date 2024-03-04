import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Result } from '../../results/entities/result.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column()
  email: string;

  @OneToMany(() => Result, (result) => result.student)
  results: Result[];
}
