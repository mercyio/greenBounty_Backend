// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import mongoose, { Document } from 'mongoose';
// import { User, UserDocument } from '../user/schemas/user.schema';
// import { BaseHelper } from 'src/common/utils/helper.util';
// import { WithdrawalStatusEnum } from 'src/common/enums/transaction.enum';
// import {
//   WithdrawalAccount,
//   WithdrawalAccountDocument,
// } from '../withdrawal-account/schema/withdrawal-account.schema';

// export type WithdrawalDocument = Withdrawal & Document;

// @Schema({ timestamps: true })
// export class Withdrawal {
//   @Prop({
//     type: mongoose.Schema.Types.ObjectId,
//     ref: User.name,
//   })
//   user: UserDocument;

//   @Prop({
//     type: mongoose.Schema.Types.ObjectId,
//     ref: WithdrawalAccount.name,
//   })
//   withdrawalAccount: WithdrawalAccountDocument;

//   @Prop({ required: true })
//   amount: number;

//   @Prop({ enum: WithdrawalStatusEnum, default: WithdrawalStatusEnum.Pending })
//   status: WithdrawalStatusEnum;

//   @Prop()
//   rejectionReason?: string;

//   @Prop({ default: 'Withdrawal' })
//   description: string;
// }

// export const WithdrawalSchema = SchemaFactory.createForClass(Withdrawal);

// WithdrawalSchema.pre('validate', function (next) {
//   (this as any).reference = BaseHelper.generateRandomString();
//   next();
// });

// WithdrawalSchema.pre(['find', 'findOne'], function (next) {
//   this.populate('user');
//   next();
// });

// WithdrawalSchema.pre('findOne', function (next) {
//   this.populate('user');
//   next();
// });
