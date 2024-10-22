import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WaitListDocument = WaitList & Document;

@Schema({ timestamps: true })
export class WaitList {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const WaitListSchema = SchemaFactory.createForClass(WaitList);
