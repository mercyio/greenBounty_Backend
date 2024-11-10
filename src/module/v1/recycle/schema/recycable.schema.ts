// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import mongoose, { Document } from 'mongoose';
// import { User, UserDocument } from '../../user/schemas/user.schema';
// import { PaymentStatusEnum } from 'src/common/enums/transaction.enum';

// export type RecylabeSDocument = Recylables & Document;

// @Schema({ timestamps: true })
// export class Recylables {
//   @Prop({
//     required: true,
//     type: mongoose.Schema.Types.ObjectId,
//     ref: User.name,
//   })
//   user: UserDocument;

//   @Prop({ required: true, default: [] })
//   items: [];

//   @Prop({ enum: PaymentStatusEnum, default: PaymentStatusEnum.Pending })
//   paymentStatus: PaymentStatusEnum;

//   @Prop({ required: true })
//   totalAmount: number;

//   @Prop({ required: true })
//   reference: string;

//   @Prop({ default: false })
//   isDeleted: boolean;

//   createdAt?: Date;
//   updatedAt?: Date;
// }

// export const PremiumBasketSchema = SchemaFactory.createForClass(PremiumBasket);

// PremiumBasketSchema.pre('find', function (next) {
//   this.where({ isDeleted: false });

//   next();
// });
