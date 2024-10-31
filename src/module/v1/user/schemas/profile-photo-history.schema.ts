import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './user.schema';

export type ProfilePhotoHistoryDocument = ProfilePhotoHistory & Document;

@Schema({ timestamps: true })
export class ProfilePhotoHistory {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: mongoose.Types.ObjectId;

  @Prop()
  profilePhoto: string;
}

export const ProfilePhotoHistorySchema =
  SchemaFactory.createForClass(ProfilePhotoHistory);
