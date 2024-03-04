import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { Student } from '../../students/entities/student.entity';

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course, (course) => course.results, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'courseId' })
  course: Course;

  @ManyToOne(() => Student, (student) => student.results, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'studentId' })
  student: Student;

  // @Column({ type: 'enum', enum: ['A', 'B', 'C', 'D', 'E', 'F'] })
  // score: string;

  @Column({ type: 'varchar', length: 1 }) // Use varchar for single character score
  score: string;
}
