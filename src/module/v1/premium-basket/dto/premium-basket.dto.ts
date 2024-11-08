import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { BasketTypeEnum } from 'src/common/enums/basket.enum';

export class SelectBasketDto {
  @IsString()
  @IsEnum(BasketTypeEnum)
  plan: BasketTypeEnum;
}

export class ProcessPaymentDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  basketId: string;

  @IsNumber()
  @IsNotEmpty()
  fee: number;
}
