import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import {
  TransactionTypeEnum,
  WithdrawalStatusEnum,
} from 'src/common/enums/transaction.enum';
import { PaginationDto } from '../../repository/dto/repository.dto';

export class CreateWithdrawalDto {
  @IsNotEmpty()
  @IsString()
  account: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1000)
  amount: number;

  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateWithdrawalStatusDto {
  @IsNotEmpty()
  @IsString()
  status: WithdrawalStatusEnum;

  @IsString()
  rejectionReason?: string;
}

export class GetUserWithdrawalDto extends PaginationDto {
  @IsOptional()
  @IsEnum(TransactionTypeEnum)
  type?: TransactionTypeEnum;

  @IsOptional()
  @IsEnum(WithdrawalStatusEnum)
  status?: WithdrawalStatusEnum;
}
