import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { Student } from '../../students/entities/student.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the result.' })
  id: number;

  @ManyToOne(() => Course, (course) => course.results, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'courseId' })
  @ApiProperty({ description: 'The course associated with the result.' })
  course: Course;

  @ManyToOne(() => Student, (student) => student.results, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'studentId' })
  @ApiProperty({ description: 'The student associated with the result.' })
  student: Student;

  @Column({ type: 'enum', enum: ['A', 'B', 'C', 'D', 'E', 'F'] })
  @ApiProperty({
    description: 'The score of the result.',
    enum: ['A', 'B', 'C', 'D', 'E', 'F'],
  })
  score: string;
}
