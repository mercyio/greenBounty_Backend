import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePickupDto {
  @IsNotEmpty()
  @IsDateString()
  pickupDate: string;

  @IsNotEmpty()
  @IsString()
  pickupAddress: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class AssignRecyclerDto {
  @IsMongoId()
  @IsNotEmpty()
  recycler: string;
}
