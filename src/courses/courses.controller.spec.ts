import { Test, TestingModule } from '@nestjs/testing';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';

describe('CoursesController', () => {
  let controller: CoursesController;
  let service: Partial<CoursesService>;

  beforeEach(async () => {
    service = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoursesController],
      providers: [{ provide: CoursesService, useValue: service }],
    }).compile();

    controller = module.get<CoursesController>(CoursesController);
  });

  describe('create', () => {
    it('should call coursesService.create with the correct parameters', async () => {
      const createCourseDto: CreateCourseDto = { name: 'Test Course' };
      jest.spyOn(service, 'create');

      await controller.create(createCourseDto);

      expect(service.create).toHaveBeenCalledWith(createCourseDto);
    });
  });

  describe('findAll', () => {
    it('should call coursesService.findAll', async () => {
      jest.spyOn(service, 'findAll');

      await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call coursesService.findOne with the correct ID', async () => {
      const courseId = '1';
      jest.spyOn(service, 'findOne');

      await controller.findOne(courseId);

      expect(service.findOne).toHaveBeenCalledWith(+courseId);
    });
  });

  describe('remove', () => {
    it('should call coursesService.remove with the correct ID', async () => {
      const courseId = '1';
      jest.spyOn(service, 'remove');

      await controller.remove(courseId);

      expect(service.remove).toHaveBeenCalledWith(+courseId);
    });
  });
});
