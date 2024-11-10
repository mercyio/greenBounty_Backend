import { IsEnum, IsMongoId, IsNumber, IsString } from 'class-validator';
import { RecycleItemTypeEnum } from 'src/common/enums/recycle.enum';

export class AddRecyclableItemDto {
  @IsMongoId()
  @IsString()
  basketId: string;

  @IsString()
  @IsEnum(RecycleItemTypeEnum)
  item: RecycleItemTypeEnum;

  @IsNumber()
  quantity: number;
}
