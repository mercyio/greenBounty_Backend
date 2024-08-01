import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Recycle } from '../../recycle/schema/recycle.schema';
import { User, UserDocument } from '../../user/schemas/user.schema';
import { PickupStatusEnum } from 'src/common/enums/transaction.enum';
import { Pickup, PickupDocument } from './pickup.schema';

export type PickupHistoryDocument = PickupHistory & Document;

@Schema()
export class PickupHistory {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  user: UserDocument;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Pickup.name,
  })
  pickup: PickupDocument;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Recycle.name }] })
  items: Recycle[];

  @Prop({ enum: PickupStatusEnum })
  status: PickupStatusEnum;

  @Prop()
  pickupDate: Date;

  @Prop()
  pickupAddress: string;
}

export const PickupHistorySchema = SchemaFactory.createForClass(PickupHistory);

PickupHistorySchema.pre('find', function (next) {
  this.where({ isDeleted: false });

  next();
});
