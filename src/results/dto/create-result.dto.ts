import { IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateResultDto {
  @IsNotEmpty()
  courseId: number;

  @IsNotEmpty()
  studentId: number;

  @ApiProperty({ enum: ['A', 'B', 'C', 'D', 'E', 'F'], enumName: 'Result' })
  @IsEnum(['A', 'B', 'C', 'D', 'E', 'F'])
  @IsNotEmpty()
  score: string;
}
