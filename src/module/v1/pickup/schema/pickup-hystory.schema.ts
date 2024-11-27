import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Recycle } from '../../recycle/schema/recycle.schema';
import { User, UserDocument } from '../../user/schemas/user.schema';
import { PickupStatusEnum } from 'src/common/enums/transaction.enum';
import { Pickup, PickupDocument } from './pickup.schema';
import { ItemConditionEnum } from 'src/common/enums/pickup.enum';
import { RecycleItemTypeEnum } from 'src/common/enums/recycle.enum';

export type PickupHistoryDocument = PickupHistory & Document;

@Schema()
export class PickupHistory {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Pickup.name,
  })
  pickup: PickupDocument;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  user: UserDocument;

  @Prop()
  name: string;

  @Prop()
  pickupAddress: string;

  @Prop()
  pickupDate: Date;

  @Prop()
  weight: number;

  @Prop({ enum: RecycleItemTypeEnum })
  wasteType: RecycleItemTypeEnum;

  @Prop({ enum: ItemConditionEnum })
  itemCondition: ItemConditionEnum;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Recycle.name }] })
  recycleItems: Recycle[];

  @Prop()
  note?: string;

  @Prop({ enum: PickupStatusEnum })
  status: PickupStatusEnum;
}

export const PickupHistorySchema = SchemaFactory.createForClass(PickupHistory);

PickupHistorySchema.pre('find', function (next) {
  this.where({ isDeleted: false });

  next();
});
