import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User, UserDocument } from '../../user/schemas/user.schema';
import { BasketTypeEnum } from 'src/common/enums/basket.enum';

// @Schema({ timestamps: true })
// export class Items {
//   @Prop({ enum: PaymentStatusEnum, required: true })
//   type: RecylabeTypeEnum;

//   @Prop()
//   quantity: number;
// }

export type BasketDocument = Basket & Document;

@Schema({ timestamps: true })
export class Basket {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  user: UserDocument;

  @Prop({ enum: BasketTypeEnum })
  plan: BasketTypeEnum;

  @Prop({ default: false })
  isDeleted: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

export const BasketSchema = SchemaFactory.createForClass(Basket);

BasketSchema.pre('find', function (next) {
  this.where({ isDeleted: false });

  next();
});
