import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { LESSON_REPOSITORY, ILessonRepository } from '../../interfaces/lesson.interface';

@Injectable()
export class UpdateLessonContentUseCase {
  constructor(
    @Inject(LESSON_REPOSITORY)
    private readonly lessonRepository: ILessonRepository,
  ) {}

  /**
   * Update a lesson's content
   * @param id The lesson ID
   * @param content The new content URL
   * @throws NotFoundException if lesson not found
   */
  async execute(id: string, content: string): Promise<void> {
    const lesson = await this.lessonRepository.update(id, { contentUrl: content });
    
    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }
  }
} 