import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Result } from '../../results/entities/result.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the student.' })
  id: number;

  @Column()
  @ApiProperty({ description: 'The first name of the student.' })
  firstName: string;

  @Column()
  @ApiProperty({ description: 'The last name of the student.' })
  lastName: string;

  @Column({ type: 'date' })
  @ApiProperty({ description: 'The date of birth of the student.' })
  dateOfBirth: Date;

  @Column()
  @ApiProperty({ description: 'The email address of the student.' })
  email: string;

  @OneToMany(() => Result, (result) => result.student)
  results: Result[];
}
