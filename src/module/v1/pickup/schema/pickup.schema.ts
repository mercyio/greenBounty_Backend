import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Recycle } from '../../recycle/schema/recycle.schema';
import { User, UserDocument } from '../../user/schemas/user.schema';
import { PickupStatusEnum } from 'src/common/enums/transaction.enum';
import { ItemConditionEnum } from 'src/common/enums/pickup.enum';

export type PickupDocument = Pickup & Document;

@Schema()
export class Pickup {
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

  @Prop({ enum: ItemConditionEnum })
  itemCondition: ItemConditionEnum;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Recycle.name }] })
  recycleItems: Recycle[];

  @Prop()
  wasteType: string[];

  @Prop()
  note?: string;

  @Prop({ enum: PickupStatusEnum })
  status: PickupStatusEnum;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  assignedRecycler: UserDocument;

  @Prop({ default: false })
  isRewarded: boolean;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  createdAt: Date;

  @Prop({ default: '' })
  acceptedAt: Date;

  @Prop({ default: '' })
  rewardedAt: Date;
}

export const PickupSchema = SchemaFactory.createForClass(Pickup);

PickupSchema.pre('find', function (next) {
  this.where({ isDeleted: false });

  next();
});
