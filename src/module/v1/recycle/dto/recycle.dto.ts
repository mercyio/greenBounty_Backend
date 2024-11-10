import { IsEnum, IsNumber, IsString } from 'class-validator';
import { RecycleItemTypeEnum } from 'src/common/enums/recycle.enum';

export class RecycleItemDto {
  @IsString()
  @IsEnum(RecycleItemTypeEnum)
  item: RecycleItemTypeEnum;

  @IsNumber()
  quantity: number;
}
