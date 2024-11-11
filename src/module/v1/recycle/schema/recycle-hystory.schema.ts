import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { Recycle } from './recycle.schema';
import { Pickup, PickupDocument } from '../../pickup/schema/pickup.schema';

export type RecycleHistoryDocument = RecycleHistory & Document;

@Schema({ timestamps: true })
export class RecycleHistory {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  user: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Pickup.name,
  })
  pickups: PickupDocument;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Recycle.name }] })
  recycleItems: Recycle[];

  @Prop({
    type: Boolean,
    default: false,
  })
  isDeleted: boolean;
}

export const RecycleHistorySchema =
  SchemaFactory.createForClass(RecycleHistory);

RecycleHistorySchema.pre('find', function (next) {
  this.where({ isDeleted: false });

  next();
});
