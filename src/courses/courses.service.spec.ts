import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { NotFoundException } from '@nestjs/common';

describe('CoursesService', () => {
  let service: CoursesService;
  let courseRepository: Repository<Course>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        {
          provide: getRepositoryToken(Course),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
    courseRepository = module.get<Repository<Course>>(
      getRepositoryToken(Course),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a course', async () => {
      const mockCreateCourseDto = { name: 'Math' };
      jest.spyOn(courseRepository, 'create').mockReturnValue({} as Course);
      jest.spyOn(courseRepository, 'save').mockResolvedValue({} as Course);

      await service.create(mockCreateCourseDto);

      expect(courseRepository.create).toHaveBeenCalledWith(mockCreateCourseDto);
      expect(courseRepository.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of courses', async () => {
      const mockCourses = [{ id: 1, name: 'Math', results: [] }];
      jest
        .spyOn(courseRepository, 'find')
        .mockResolvedValue(Promise.resolve(mockCourses));

      const courses = await service.findAll();

      expect(courses).toEqual(mockCourses);
    });
  });

  describe('findOne', () => {
    it('should return the course with the given id', async () => {
      const mockCourseId = 1;
      const mockCourse = { id: mockCourseId, name: 'Math', results: [] };
      jest.spyOn(courseRepository, 'findOneBy').mockResolvedValue(mockCourse);

      const course = await service.findOne(mockCourseId);

      expect(course).toEqual(mockCourse);
      expect(courseRepository.findOneBy).toHaveBeenCalledWith({
        id: mockCourseId,
      });
    });

    it('should throw NotFoundException if course not found', async () => {
      const mockCourseId = 999;
      jest.spyOn(courseRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.findOne(mockCourseId)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove the course with the given id', async () => {
      const mockCourseId = 1;
      const mockDeleteResult = { affected: 1 };
      jest
        .spyOn(courseRepository, 'delete')
        .mockResolvedValue(mockDeleteResult as DeleteResult);

      await service.remove(mockCourseId);

      expect(courseRepository.delete).toHaveBeenCalledWith(mockCourseId);
    });

    it('should throw NotFoundException if course not found', async () => {
      const mockCourseId = 999;
      const mockDeleteResult = { affected: 0 };
      jest
        .spyOn(courseRepository, 'delete')
        .mockResolvedValue(mockDeleteResult as DeleteResult);

      await expect(service.remove(mockCourseId)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
