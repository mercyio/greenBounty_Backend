import { IsEnum, IsMongoId, IsNumber, IsString } from 'class-validator';
import { RecylabeTypeEnum } from 'src/common/enums/recyclabe.enum';

export class AddRecyclableDto {
  @IsMongoId()
  @IsString()
  basketId: string;

  @IsString()
  @IsEnum(RecylabeTypeEnum)
  type: RecylabeTypeEnum;

  @IsNumber()
  quantity: number;
}
