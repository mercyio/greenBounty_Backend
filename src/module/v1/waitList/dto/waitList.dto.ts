import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class JoinWaitListDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
