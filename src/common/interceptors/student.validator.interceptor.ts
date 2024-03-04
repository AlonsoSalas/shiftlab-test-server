import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateStudentDto } from '../../students/dto/create-student.dto';

@Injectable()
export class StudentValidatorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const createStudentDto: CreateStudentDto = request.body;

    const currentDate = new Date();
    const studentBirth = new Date(createStudentDto.dateOfBirth);
    const ageDiff = currentDate.getFullYear() - studentBirth.getFullYear();
    if (ageDiff < 10) {
      throw new BadRequestException('Student must be at least 10 years old');
    }

    return next.handle();
  }
}
