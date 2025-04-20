import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { LESSON_REPOSITORY, ILessonRepository } from '../../interfaces/lesson.interface';
import { Lesson } from '@/core/domain/entities/lesson.entity';

@Injectable()
export class GetLessonUseCase {
  constructor(
    @Inject(LESSON_REPOSITORY)
    private readonly lessonRepository: ILessonRepository,
  ) {}

  /**
   * Get a lesson by ID
   * @param id The lesson ID
   * @returns The lesson data
   * @throws NotFoundException if lesson not found
   */
  async execute(id: string): Promise<Lesson> {
    const lesson = await this.lessonRepository.findById(id);
    
    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }
    
    return lesson;
  }
} 