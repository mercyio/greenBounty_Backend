import {
  IsBoolean,
  IsBooleanString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  isNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { PaginationDto } from '../../repository/dto/repository.dto';
import { BasketTypeEnum } from 'src/common/enums/basket.enum';
import { UserRoleEnum } from 'src/common/enums/user.enum';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  @MaxLength(30)
  password: string;

  @IsString()
  @IsOptional()
  referralCode?: string;

  // @IsEnum([UserRoleEnum.HUNTER, UserRoleEnum.RECYCLER])
  // @IsNotEmpty()
  // activeRole?: UserRoleEnum;
}

export class GoogleAuthDto {
  @IsEmail()
  email: string;
}

export class GetUserPublicDto {
  @IsOptional()
  @IsString()
  name: string;

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

export class UpgradeBasketDto {
  @IsString()
  @IsEnum(BasketTypeEnum)
  plan: BasketTypeEnum;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => (value === 'true' ? true : false))
  deleteProfilePhoto?: boolean;
}

export class SwitchDashboardDto {
  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;
}
