import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsEmail,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRoleEnum } from '../../../../common/enums/user.enum';

export class AdminAssignRoleDto {
  @IsString()
  @IsNotEmpty()
  assigneeId: string;

  @IsEnum(UserRoleEnum)
  @IsNotEmpty()
  role: UserRoleEnum;
}

export class ActivateDeactivateAdminDto {
  @IsString()
  @IsNotEmpty()
  adminToUpdateId: string;

  @IsNotEmpty()
  isActive: boolean;
}

export class CreateAdminDto {
  @IsString()
  fullName: string;

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
}
