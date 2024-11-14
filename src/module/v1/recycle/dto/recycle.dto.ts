import { IsEnum, IsNumber, IsString } from 'class-validator';
import { RecycleItemTypeEnum } from 'src/common/enums/recycle.enum';

export class RecycleItemDto {
  @IsString()
  @IsEnum(RecycleItemTypeEnum)
  item: RecycleItemTypeEnum;

  // @IsArray()
  // @IsString({ each: true })
  // items: string[];

  @IsNumber()
  quantity: number;
}
