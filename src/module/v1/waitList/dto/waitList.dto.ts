import { IsEmail, IsNotEmpty } from 'class-validator';

export class JoinWaitListDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
