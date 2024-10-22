import { IsBoolean, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class AddToWaitListDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class GetAllWaitListDto {
  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;
}
