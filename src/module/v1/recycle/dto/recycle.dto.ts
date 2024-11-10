import { IsEnum, IsMongoId, IsNumber, IsString } from 'class-validator';
import { RecycleItemTypeEnum } from 'src/common/enums/recycle.enum';

export class RecycleItemDto {
  @IsMongoId()
  @IsString()
  basket: string;

  @IsString()
  @IsEnum(RecycleItemTypeEnum)
  item: RecycleItemTypeEnum;

  @IsNumber()
  quantity: number;
}

export class UpdateRecycleItemDto {
  @IsMongoId()
  @IsString()
  _id: string;

  @IsString()
  @IsEnum(RecycleItemTypeEnum)
  item: RecycleItemTypeEnum;

  @IsNumber()
  quantity: number;
}
