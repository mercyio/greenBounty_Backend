import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User, UserDocument } from '../user/schemas/user.schema';

export type RewardChartDocument = RewardChart & Document;

@Schema({ timestamps: true })
export class RewardChart {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  user: UserDocument;

  @Prop({ required: true })
  month: string;

  @Prop({ required: true })
  amount: number;
}

export const RewardChartSchema = SchemaFactory.createForClass(RewardChart);
