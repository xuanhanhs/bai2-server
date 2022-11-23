import {
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
  Min,
  Max,
  Matches,
  IsEmail,
} from 'class-validator';
import { Transform } from 'class-transformer';
import {
  MAX_LENGTH_FULLNAME,
  MAX_SCORE,
  MIN_LENGTH_FULLNAME,
  MIN_SCORE,
  REGEX_DATE,
  REGEX_PHONE,
} from 'src/utils';

export class CreateStudentDto {
  @IsString()
  @Transform(({ value }) => value?.trim())
  @MinLength(MIN_LENGTH_FULLNAME)
  @MaxLength(MAX_LENGTH_FULLNAME)
  fullname: string;

  @Matches(REGEX_DATE)
  birthday: string;

  @IsNumber()
  @Min(MIN_SCORE)
  @Max(MAX_SCORE)
  score: number;

  @IsEmail()
  email: string;

  @Matches(REGEX_PHONE)
  phone_number: string;

  @Matches(REGEX_DATE)
  enroll_date: string;
}
