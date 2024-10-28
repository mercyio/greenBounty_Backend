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
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  @MaxLength(30)
  password: string;
}
