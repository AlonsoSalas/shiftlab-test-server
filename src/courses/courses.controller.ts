import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import {
  ApiTags,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @ApiBody({ type: CreateCourseDto })
  @ApiCreatedResponse({ description: 'Course created successfully' })
  create(@Body(ValidationPipe) createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  @ApiOkResponse({ description: 'List of all courses retrieved successfully' })
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Course ID' })
  @ApiOkResponse({ description: 'Course retrieved successfully' })
  @ApiNotFoundResponse({ description: 'Course not found' })
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Course ID' })
  @ApiOkResponse({ description: 'Course deleted successfully' })
  @ApiNotFoundResponse({ description: 'Course not found' })
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
