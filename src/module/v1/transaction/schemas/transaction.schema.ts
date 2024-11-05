import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Payment, PaymentDocument } from '../../payment/schema/payment.schema';
import { User, UserDocument } from '../../user/schemas/user.schema';
import {
  TransactionStatusEnum,
  TransactionTypeEnum,
} from '../../../../common/enums/transaction.enum';
import { PremiumBasket } from '../../premium-basket/schema/premium-basket.schema';
import { BaseHelper } from 'src/common/utils/helper.util';

export type TransactionDocument = Transaction & Document;

@Schema({ timestamps: true })
export class Transaction {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  user: UserDocument;

  @Prop({ unique: true, required: true })
  reference: string;

  @Prop({ enum: TransactionTypeEnum, required: true })
  type: TransactionTypeEnum;

  @Prop({ default: null })
  description: string;

  @Prop({ default: 0, select: false })
  settlement: number; // this is platform fee

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: PremiumBasket.name,
  })
  premium: PremiumBasket;

  @Prop()
  totalAmount: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Payment.name,
  })
  paymentMethod: PaymentDocument;

  @Prop({ enum: TransactionStatusEnum, default: TransactionStatusEnum.Pending })
  status: TransactionStatusEnum;

  @Prop({ type: Object, default: {}, select: false })
  metadata: any;

  @Prop()
  errorMessage: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);

TransactionSchema.pre('validate', function (next) {
  this.reference = BaseHelper.generateRandomString();
  next();
});

TransactionSchema.pre(['find', 'findOne'], function (next) {
  this.populate('user order paymentMethod');
  next();
});

TransactionSchema.pre('findOne', function (next) {
  this.populate('user order paymentMethod');
  next();
});
