import { Test, TestingModule } from '@nestjs/testing';
import { ResultsController } from './results.controller';
import { ResultsService } from './results.service';
import { CreateResultDto } from './dto/create-result.dto';

describe('ResultsController', () => {
  let controller: ResultsController;
  let service: ResultsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResultsController],
      providers: [
        {
          provide: ResultsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ResultsController>(ResultsController);
    service = module.get<ResultsService>(ResultsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service create method with correct parameter', async () => {
      const createResultDto: CreateResultDto = {
        courseId: 1,
        studentId: 1,
        score: 'A',
      };
      const createSpy = jest.spyOn(service, 'create');
      await controller.create(createResultDto);
      expect(createSpy).toHaveBeenCalledWith(createResultDto);
    });
  });

  describe('findAll', () => {
    it('should call service findAll method', async () => {
      const findAllSpy = jest.spyOn(service, 'findAll');
      await controller.findAll();
      expect(findAllSpy).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call service findOne method with correct parameter', async () => {
      const id = '1';
      const findOneSpy = jest.spyOn(service, 'findOne');
      await controller.findOne(id);
      expect(findOneSpy).toHaveBeenCalledWith(+id);
    });
  });

  describe('remove', () => {
    it('should call service remove method with correct parameter', async () => {
      const id = '1';
      const removeSpy = jest.spyOn(service, 'remove');
      await controller.remove(id);
      expect(removeSpy).toHaveBeenCalledWith(+id);
    });
  });
});
