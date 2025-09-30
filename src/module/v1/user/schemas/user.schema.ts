import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { UserRoleEnum } from '../../../../common/enums/user.enum';
import { BasketTypeEnum } from 'src/common/enums/basket.enum';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: false, index: true })
  name?: string;

  @Prop({ unique: true, index: true, required: true })
  email: string;

  @Prop({ default: false })
  emailVerified: boolean;

  @Prop({ select: false })
  password: string;

  @Prop({ enum: UserRoleEnum, default: UserRoleEnum.USER })
  role: UserRoleEnum.USER;

  @Prop({ enum: UserRoleEnum })
  activeRole: UserRoleEnum;

  @Prop({ enum: BasketTypeEnum })
  basket: BasketTypeEnum;

  @Prop({ default: null, index: true })
  referralCode: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  referredBy: UserDocument;

  @Prop({ default: 0 })
  totalReferrals: number;

  @Prop({ default: false, select: false })
  isReferralBonusClaimed: boolean;

  @Prop({ default: 0 })
  wallet: number;

  @Prop({ default: null })
  profilePhoto: string;

  @Prop({ default: false })
  isGoogleAuth: boolean;

  @Prop({ default: false })
  isLoggedOut: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
