import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User, UserDocument } from '../../user/schemas/user.schema';

export type WithdrawalAccountDocument = WithdrawalAccount & Document;

@Schema({ timestamps: true })
export class WithdrawalAccount {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  user: UserDocument;

  @Prop({ required: true })
  accountName: string;

  @Prop({ required: true })
  accountNumber: string;

  @Prop({ required: true })
  bankName: string;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const WithdrawalAccountSchema =
  SchemaFactory.createForClass(WithdrawalAccount);

WithdrawalAccountSchema.pre(['find', 'findOne'], function (next) {
  this.where({ isDeleted: false });
  next();
});
