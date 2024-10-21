import {
  IsBooleanString,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { PaginationDto } from '../../repository/dto/repository.dto';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  confirmPassword: string;

  @IsString()
  @IsOptional()
  referralCode?: string;
}

export class GoogleAuthDto {
  @IsEmail()
  email: string;
}

export class GetUserPublicDto {
  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  userId: string;

  @IsOptional()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;
}

export class AdminGetAllUsersDto extends PaginationDto {
  @IsOptional()
  @IsBooleanString()
  isDeleted: boolean;
}
