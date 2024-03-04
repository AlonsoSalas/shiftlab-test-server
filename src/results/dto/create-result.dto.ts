import { IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateResultDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'The ID of the course associated with the result.',
  })
  courseId: number;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The ID of the student associated with the result.',
  })
  studentId: number;

  @IsEnum(['A', 'B', 'C', 'D', 'E', 'F'])
  @IsNotEmpty()
  @ApiProperty({
    description: 'The score of the result.',
    enum: ['A', 'B', 'C', 'D', 'E', 'F'],
    enumName: 'Result',
  })
  score: string;
}
