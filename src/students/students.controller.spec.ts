import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';

describe('StudentsController', () => {
  let controller: StudentsController;
  let mockStudentsService: Partial<StudentsService>;

  beforeEach(async () => {
    mockStudentsService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsController],
      providers: [{ provide: StudentsService, useValue: mockStudentsService }],
    }).compile();

    controller = module.get<StudentsController>(StudentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call StudentsService.create with the correct parameters', async () => {
      const createStudentDto: CreateStudentDto = {
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: new Date('2000-01-01'),
        email: 'john@example.com',
      };

      await controller.create(createStudentDto);

      expect(mockStudentsService.create).toHaveBeenCalledWith(createStudentDto);
    });
  });

  describe('findAll', () => {
    it('should call StudentsService.findAll', async () => {
      await controller.findAll();

      expect(mockStudentsService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call StudentsService.findOne', async () => {
      const courseId = '1';
      await controller.findOne(courseId);

      expect(mockStudentsService.findOne).toHaveBeenCalledWith(+courseId);
    });
  });

  describe('remove', () => {
    it('should call StudentsService.findOne', async () => {
      const courseId = '1';
      await controller.remove(courseId);

      expect(mockStudentsService.remove).toHaveBeenCalledWith(+courseId);
    });
  });
});
