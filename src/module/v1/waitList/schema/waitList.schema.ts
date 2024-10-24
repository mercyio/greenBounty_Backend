import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({
  timestamps: true,
})
export class WaitList extends Document {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const WaitListSchema = SchemaFactory.createForClass(WaitList);
