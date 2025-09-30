import { IsEmail, IsEnum, IsNumber, IsString } from 'class-validator';
import { CreateUserDto } from '../../user/dto/user.dto';
import { UserRoleEnum } from 'src/common/enums/user.enum';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class VerifyEmailDto {
  @IsEmail()
  email: string;

  @IsNumber()
  code: number;
}

export class RequestVerifyEmailOtpDto {
  @IsEmail()
  email: string;
}

export class ForgotPasswordDto {
  @IsEmail()
  email: string;
}

export class ResetPasswordDto extends LoginDto {
  @IsString()
  password: string;

  @IsString()
  confirmPassword: string;
}

export class SuperAdminSignUpDto extends CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
