import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  Validate,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { Unique } from 'typeorm';
import { User } from '../entities/user.entity';

export class SignUpDto {
  @IsEmail()
  @ApiProperty({ type: String })
  @Validate(Unique, [User])
  email: string;

  @IsString()
  @ApiProperty({ type: String })
  @MinLength(8)
  @MaxLength(20)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}
