import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsDate } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsDate()
  dateOfBirth: Date;

  @ApiProperty()
  @IsEmail()
  email: string;
}
