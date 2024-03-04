import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResultDto } from './dto/create-result.dto';
import { Result } from './entities/result.entity';
import { CoursesService } from '../courses/courses.service';
import { StudentsService } from '../students/students.service';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
    private readonly courseService: CoursesService,
    private readonly studentService: StudentsService,
  ) {}

  async create(createResultDto: CreateResultDto): Promise<Result> {
    const { courseId, studentId, score } = createResultDto;

    const foundCourse = await this.courseService.findOne(courseId);
    const foundStudent = await this.studentService.findOne(studentId);

    if (!foundCourse || !foundStudent) {
      throw new NotFoundException('Course or Student not found');
    }

    const result = this.resultRepository.create({
      course: foundCourse,
      student: foundStudent,
      score: score,
    });
    return await this.resultRepository.save(result);
  }
  async findAll(): Promise<Result[]> {
    return await this.resultRepository.find({
      relations: ['student', 'course'],
    });
  }

  async findOne(id: number): Promise<Result> {
    const result = await this.resultRepository.findOne({
      where: { id },
      relations: ['student', 'course'],
    });
    if (!result) {
      throw new NotFoundException(`Result with id ${id} not found`);
    }
    return result;
  }

  async remove(id: number): Promise<void> {
    const result = await this.findOne(id);
    await this.resultRepository.remove(result);
  }
}
