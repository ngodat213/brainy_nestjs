import { Lesson } from '../../domain/entities/lesson.entity';

export const LESSON_REPOSITORY = 'LESSON_REPOSITORY';

export interface ILessonRepository {
  create(lesson: Partial<Lesson>): Promise<Lesson>;
  findById(id: string): Promise<Lesson | null>;
  findAll(): Promise<Lesson[]>;
  update(id: string, lesson: Partial<Lesson>): Promise<Lesson | null>;
  delete(id: string): Promise<boolean>;
  findByLevel(level: string): Promise<Lesson[]>;
  findByCategory(category: string): Promise<Lesson[]>;
  findPublished(): Promise<Lesson[]>;
  findUnpublished(): Promise<Lesson[]>;
  updateOrder(lessons: { id: string; order: number }[]): Promise<boolean>;
} 