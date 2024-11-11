import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { Recycle } from './recycle.schema';
export type RecycleHistoryDocument = RecycleHistory & Document;

@Schema({ timestamps: true })
export class RecycleHistory {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  user: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Recycle.name }] })
  items: Recycle[];

  @Prop({
    type: Boolean,
    default: false,
  })
  isDeleted: boolean;

  @Prop()
  pickupDate: Date;
}

export const RecycleHistorySchema =
  SchemaFactory.createForClass(RecycleHistory);

RecycleHistorySchema.pre('find', function (next) {
  this.where({ isDeleted: false });

  next();
});
