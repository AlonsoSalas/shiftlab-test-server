import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { NotFoundException } from '@nestjs/common';

describe('StudentsService', () => {
  let service: StudentsService;
  let studentRepository: Repository<Student>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        {
          provide: getRepositoryToken(Student),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
    studentRepository = module.get<Repository<Student>>(
      getRepositoryToken(Student),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a student', async () => {
      const mockCreateStudentDto = {
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: new Date('2000-01-01'),
        email: 'john@example.com',
      };

      jest.spyOn(studentRepository, 'create').mockReturnValue({} as Student);
      jest.spyOn(studentRepository, 'save').mockResolvedValue({} as Student);

      await service.create(mockCreateStudentDto);

      expect(studentRepository.create).toHaveBeenCalledWith(
        mockCreateStudentDto,
      );
      expect(studentRepository.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of students', async () => {
      const mockStudentsDto = [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          dateOfBirth: new Date('2000-01-01'),
          email: 'john@example.com',
          results: [],
        },
      ];
      jest
        .spyOn(studentRepository, 'find')
        .mockResolvedValue(Promise.resolve(mockStudentsDto));

      await service.findAll();
      expect(studentRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return the student with the given id', async () => {
      const mockStudentId = 1;
      const mockStudentsDto = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: new Date('2000-01-01'),
        email: 'john@example.com',
        results: [],
      };
      jest
        .spyOn(studentRepository, 'findOneBy')
        .mockResolvedValue(Promise.resolve(mockStudentsDto));

      await service.findOne(mockStudentId);
      expect(studentRepository.findOneBy).toHaveBeenCalledWith({
        id: mockStudentId,
      });
    });

    it('should throw NotFoundException if student not found', async () => {
      const mockStudentId = 999;
      jest.spyOn(studentRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.findOne(mockStudentId)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove the student with the given id', async () => {
      const mockStudentId = 1;
      const mockDeleteResult = { affected: 1 };
      jest
        .spyOn(studentRepository, 'delete')
        .mockResolvedValue(mockDeleteResult as DeleteResult);

      await service.remove(mockStudentId);

      expect(studentRepository.delete).toHaveBeenCalledWith(mockStudentId);
    });

    it('should throw NotFoundException if student not found', async () => {
      const mockStudentId = 999;
      const mockDeleteResult = { affected: 0 };
      jest
        .spyOn(studentRepository, 'delete')
        .mockResolvedValue(mockDeleteResult as DeleteResult);

      await expect(service.remove(mockStudentId)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
