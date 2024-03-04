import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentValidatorInterceptor } from 'src/common/interceptors/Student.validator.interceptor';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @ApiBody({ type: CreateStudentDto })
  @UseInterceptors(StudentValidatorInterceptor)
  @ApiOkResponse({ description: 'Student created successfully' })
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  @ApiOkResponse({ description: 'List of all students' })
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Student found successfully' })
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Student deleted successfully' })
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}
