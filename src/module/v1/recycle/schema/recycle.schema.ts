import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Basket, BasketDocument } from '../../basket/schema/basket.schema';
import { RecycleItemTypeEnum } from 'src/common/enums/recycle.enum';
import { User, UserDocument } from '../../user/schemas/user.schema';

export type RecycleDocument = Recycle & Document;
@Schema({ timestamps: true })
export class Recycle {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  user: UserDocument;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Basket.name,
  })
  basket: BasketDocument;

  @Prop({ required: true })
  item: RecycleItemTypeEnum;

  @Prop()
  quantity: number;

  @Prop()
  weight: number;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const RecycleSchema = SchemaFactory.createForClass(Recycle);

RecycleSchema.pre('find', function (next) {
  this.where({ isDeleted: false });

  next();
});
