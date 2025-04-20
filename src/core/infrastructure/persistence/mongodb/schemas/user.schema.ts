import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from '../../../../domain/enums/user-role.enum';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  fullName: string;

  @Prop()
  avatar?: string;

  @Prop({ required: true, enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Prop({
    type: {
      language: { type: String, default: 'en' },
      theme: { type: String, default: 'light' },
      notifications: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: true },
        dailyReminder: { type: Boolean, default: true }
      },
      studyPreferences: {
        dailyGoal: { type: Number, default: 10 },
        difficulty: { type: String, default: 'medium' },
        autoPlayAudio: { type: Boolean, default: true }
      }
    },
    default: {}
  })
  settings: {
    language: string;
    theme: string;
    notifications: {
      email: boolean;
      push: boolean;
      dailyReminder: boolean;
    };
    studyPreferences: {
      dailyGoal: number;
      difficulty: string;
      autoPlayAudio: boolean;
    };
  };

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  lastLogin?: Date;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
