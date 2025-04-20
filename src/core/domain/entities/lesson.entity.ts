import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum ExerciseType {
  MULTIPLE_CHOICE = 'multiple_choice',
  TRUE_FALSE = 'true_false',
  FILL_IN_BLANK = 'fill_in_blank',
  MATCHING = 'matching',
}

@Schema({ timestamps: true })
export class Exercise {
  @Prop({ required: true })
  type: ExerciseType;

  @Prop({ required: true })
  question: string;

  @Prop()
  options?: string[];

  @Prop({ required: true })
  correctAnswer: string;

  @Prop()
  explanation?: string;
}

@Schema({ timestamps: true })
export class Lesson {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  level: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  contentFileId: string;

  @Prop({ required: true })
  contentUrl: string;

  @Prop()
  thumbnailId?: string;

  @Prop()
  thumbnailUrl?: string;

  @Prop({ required: true })
  order: number;

  @Prop({ default: false })
  isPublished: boolean;

  @Prop({ type: [String], default: [] })
  prerequisites: string[];

  @Prop({ type: [Exercise], default: [] })
  exercises: Exercise[];
}

export type LessonDocument = Lesson & Document;
export const LessonSchema = SchemaFactory.createForClass(Lesson); 