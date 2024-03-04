import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Result } from '../../results/entities/result.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the course.' })
  id: number;

  @Column()
  @ApiProperty({ description: 'The name of the course.' })
  name: string;

  @OneToMany(() => Result, (result) => result.course)
  results: Result[];
}
