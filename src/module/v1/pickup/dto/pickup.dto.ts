import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ItemConditionEnum } from 'src/common/enums/pickup.enum';
import { RecycleItemTypeEnum } from 'src/common/enums/recycle.enum';

export class CreatePickupDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDateString()
  pickupDate: string;

  @IsNotEmpty()
  @IsString()
  pickupAddress: string;

  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @IsNotEmpty()
  @IsEnum(ItemConditionEnum)
  itemCondition: ItemConditionEnum[];

  @IsNotEmpty()
  @IsEnum(RecycleItemTypeEnum)
  wasteType: RecycleItemTypeEnum[];

  @IsString()
  @IsOptional()
  notes?: string;
}

export class AssignRecyclerDto {
  @IsMongoId()
  @IsNotEmpty()
  recycler: string;
}
