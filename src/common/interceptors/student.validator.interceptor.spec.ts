import { Test, TestingModule } from '@nestjs/testing';
import { StudentValidatorInterceptor } from './student.validator.interceptor';
import { ExecutionContext, BadRequestException } from '@nestjs/common';
import { of } from 'rxjs';

describe('StudentValidatorInterceptor', () => {
  let interceptor: StudentValidatorInterceptor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentValidatorInterceptor],
    }).compile();

    interceptor = module.get<StudentValidatorInterceptor>(
      StudentValidatorInterceptor,
    );
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  describe('intercept', () => {
    let mockContext: ExecutionContext;
    let mockRequest: any;

    beforeEach(() => {
      mockRequest = {
        body: {
          dateOfBirth: '2015-01-01',
        },
      };
      mockContext = {
        switchToHttp: () => ({
          getRequest: () => mockRequest,
        }),
      } as ExecutionContext;
    });

    it('should throw BadRequestException if student is less than 10 years old', async () => {
      mockRequest.body.dateOfBirth = '2019-01-01';
      let error: BadRequestException | undefined;
      try {
        await interceptor
          .intercept(mockContext, {
            handle: () => of('someValue'),
          } as any)
          .toPromise();
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('Student must be at least 10 years old');
    });

    it('should pass through without error if student is at least 10 years old', async () => {
      mockRequest.body.dateOfBirth = '2010-01-01';
      const result = await interceptor
        .intercept(mockContext, {
          handle: () => of('someValue'),
        } as any)
        .toPromise();
      expect(result).toEqual('someValue');
    });
  });
});
