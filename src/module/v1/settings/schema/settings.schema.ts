import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/module/v1/user/schemas/user.schema';

export type SettingsDocument = Settings & mongoose.Document;

@Schema({ timestamps: true })
export class Settings {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  updatedBy: User;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  settings: any;
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);
