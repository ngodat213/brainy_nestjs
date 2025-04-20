import { Injectable, Inject } from '@nestjs/common';
import { LESSON_REPOSITORY, ILessonRepository } from '../../interfaces/lesson.interface';
import { Lesson } from '@/core/domain/entities/lesson.entity';

@Injectable()
export class GetLessonsUseCase {
  constructor(
    @Inject(LESSON_REPOSITORY)
    private readonly lessonRepository: ILessonRepository,
  ) {}

  /**
   * Get lessons with optional filters
   * @param filters Optional filters for level, category, and published status
   * @returns Array of lessons
   */
  async execute(filters?: {
    level?: string;
    category?: string;
    published?: boolean;
  }): Promise<Lesson[]> {
    if (filters?.published !== undefined) {
      return filters.published
        ? this.lessonRepository.findPublished()
        : this.lessonRepository.findUnpublished();
    }

    if (filters?.level) {
      return this.lessonRepository.findByLevel(filters.level);
    }

    if (filters?.category) {
      return this.lessonRepository.findByCategory(filters.category);
    }

    return this.lessonRepository.findAll();
  }
} 