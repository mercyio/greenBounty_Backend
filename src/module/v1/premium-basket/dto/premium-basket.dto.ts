import { IsEnum, IsString } from 'class-validator';
import { BasketTypeEnum } from 'src/common/enums/basket.enum';

export class SelectBasketDto {
  @IsString()
  @IsEnum(BasketTypeEnum)
  plan: BasketTypeEnum;
}
