import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lesson, LessonDocument } from '@/core/domain/entities/lesson.entity';
import { ILessonRepository } from '@/core/application/interfaces/lesson.interface';

@Injectable()
export class LessonRepository implements ILessonRepository {
  constructor(
    @InjectModel(Lesson.name)
    private readonly lessonModel: Model<LessonDocument>,
  ) {}

  async create(lesson: Partial<Lesson>): Promise<Lesson> {
    const createdLesson = new this.lessonModel(lesson);
    return createdLesson.save();
  }

  async findById(id: string): Promise<Lesson | null> {
    return this.lessonModel.findById(id).exec();
  }

  async findAll(): Promise<Lesson[]> {
    return this.lessonModel.find().sort({ order: 1 }).exec();
  }

  async update(id: string, lesson: Partial<Lesson>): Promise<Lesson | null> {
    return this.lessonModel
      .findByIdAndUpdate(id, lesson, { new: true })
      .exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.lessonModel.findByIdAndDelete(id).exec();
    return !!result;
  }

  async findByLevel(level: string): Promise<Lesson[]> {
    return this.lessonModel
      .find({ level })
      .sort({ order: 1 })
      .exec();
  }

  async findByCategory(category: string): Promise<Lesson[]> {
    return this.lessonModel
      .find({ category })
      .sort({ order: 1 })
      .exec();
  }

  async findPublished(): Promise<Lesson[]> {
    return this.lessonModel
      .find({ isPublished: true })
      .sort({ order: 1 })
      .exec();
  }

  async findUnpublished(): Promise<Lesson[]> {
    return this.lessonModel
      .find({ isPublished: false })
      .sort({ order: 1 })
      .exec();
  }

  async updateOrder(lessons: { id: string; order: number }[]): Promise<boolean> {
    const bulkOps = lessons.map(({ id, order }) => ({
      updateOne: {
        filter: { _id: id },
        update: { $set: { order } },
      },
    }));

    const result = await this.lessonModel.bulkWrite(bulkOps);
    return result.modifiedCount === lessons.length;
  }
} 