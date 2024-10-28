import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class JoinWaitListDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
