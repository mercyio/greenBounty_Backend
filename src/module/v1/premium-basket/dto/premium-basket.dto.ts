import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpgradeToPremiumBasketDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number; // Amount to be paid for the upgrade
}
