import { Module } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';

import { CoursesService } from '../courses/courses.service';
import { StudentsService } from '../students/students.service';
import { Student } from 'src/students/entities/student.entity';
import { Course } from 'src/courses/entities/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Result, Course, Student])],
  controllers: [ResultsController],
  providers: [ResultsService, CoursesService, StudentsService],
})
export class ResultsModule {}
