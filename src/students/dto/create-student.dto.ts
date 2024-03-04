import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsDateString } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({ description: 'The first name of the student.' })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'The last name of the student.' })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'The date of birth of the student in ISO format (YYYY-MM-DD).',
  })
  @IsDateString()
  dateOfBirth: Date;

  @ApiProperty({ description: 'The email address of the student.' })
  @IsEmail()
  email: string;
}
