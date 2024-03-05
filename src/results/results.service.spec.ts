import { Test, TestingModule } from '@nestjs/testing';
import { ResultsService } from './results.service';
import { DeleteResult, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { CoursesService } from '../courses/courses.service';
import { StudentsService } from '../students/students.service';
import { NotFoundException } from '@nestjs/common';
import { Course } from '../courses/entities/course.entity';
import { Student } from '../students/entities/student.entity';

describe('ResultsService', () => {
  let service: ResultsService;
  let resultRepository: Repository<Result>;

  let coursesService: CoursesService;
  let studentsService: StudentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResultsService,
        CoursesService,
        StudentsService,
        {
          provide: getRepositoryToken(Result),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Course),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Student),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ResultsService>(ResultsService);
    resultRepository = module.get<Repository<Result>>(
      getRepositoryToken(Result),
    );
    coursesService = module.get<CoursesService>(CoursesService);
    studentsService = module.get<StudentsService>(StudentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a result', async () => {
      const createResultDto = { courseId: 1, studentId: 1, score: 'A' };
      const foundCourse = { id: 1, name: 'Course 1', results: [] };
      const foundStudent = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: new Date(),
        email: 'test@test.com',
        results: [],
      };

      jest.spyOn(coursesService, 'findOne').mockResolvedValue(foundCourse);
      jest.spyOn(studentsService, 'findOne').mockResolvedValue(foundStudent);
      jest.spyOn(resultRepository, 'create').mockReturnValue({} as Result);
      jest.spyOn(resultRepository, 'save').mockResolvedValue({} as Result);

      await service.create(createResultDto);

      expect(coursesService.findOne).toHaveBeenCalledWith(
        createResultDto.courseId,
      );
      expect(studentsService.findOne).toHaveBeenCalledWith(
        createResultDto.studentId,
      );
      expect(resultRepository.create).toHaveBeenCalledWith({
        course: foundCourse,
        student: foundStudent,
        score: createResultDto.score,
      });
      expect(resultRepository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException if course not found', async () => {
      const createResultDto = { courseId: 1, studentId: 1, score: 'A' };

      jest.spyOn(coursesService, 'findOne').mockResolvedValue(undefined);
      jest.spyOn(studentsService, 'findOne').mockResolvedValue(undefined);

      await expect(service.create(createResultDto)).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('should throw NotFoundException if student not found', async () => {
      const createResultDto = { courseId: 1, studentId: 1, score: 'A' };
      const foundCourse = { id: 1, name: 'Course 1', results: [] };

      jest.spyOn(coursesService, 'findOne').mockResolvedValue(foundCourse);
      jest.spyOn(studentsService, 'findOne').mockResolvedValue(undefined);

      await expect(service.create(createResultDto)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
  describe('findAll', () => {
    it('should return an array of results', async () => {
      const results: Result[] = [
        { id: 1, course: null, student: null, score: 'A' },
      ];
      jest.spyOn(resultRepository, 'find').mockResolvedValue(results);

      expect(await service.findAll()).toEqual(results);
    });
  });

  describe('findOne', () => {
    it('should return a result with the given id', async () => {
      const result: Result = { id: 1, course: null, student: null, score: 'A' };
      jest.spyOn(resultRepository, 'findOne').mockResolvedValue(result);

      expect(await service.findOne(1)).toEqual(result);
    });

    it('should throw NotFoundException if result not found', async () => {
      jest.spyOn(resultRepository, 'findOne').mockResolvedValue(undefined);

      await expect(service.findOne(1)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove the result with the given id', async () => {
      const deleteResult = { affected: 1 };
      jest
        .spyOn(resultRepository, 'delete')
        .mockResolvedValue(deleteResult as DeleteResult);

      await service.remove(1);

      expect(resultRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if result not found', async () => {
      const deleteResult = { affected: 0 };
      jest
        .spyOn(resultRepository, 'delete')
        .mockResolvedValue(deleteResult as DeleteResult);

      await expect(service.remove(1)).rejects.toThrowError(NotFoundException);
    });
  });
});
