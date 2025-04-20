import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  fullName: string;

  @Prop()
  avatar?: string;

  @Prop({ default: UserRole.USER })
  role: UserRole;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  lastLogin?: Date;

  @Prop()
  resetPasswordCode?: string;

  @Prop()
  resetPasswordExpires?: Date;

  @Prop({ type: [String], default: [] })
  revokedTokens: string[];

  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop()
  emailVerificationCode?: string;

  @Prop()
  emailVerificationExpires?: Date;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User); 