import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { LESSON_REPOSITORY, ILessonRepository } from '../../interfaces/lesson.interface';

@Injectable()
export class DeleteLessonUseCase {
  constructor(
    @Inject(LESSON_REPOSITORY)
    private readonly lessonRepository: ILessonRepository,
  ) {}

  /**
   * Delete a lesson by ID
   * @param id The lesson ID
   * @throws NotFoundException if lesson not found
   */
  async execute(id: string): Promise<void> {
    const result = await this.lessonRepository.delete(id);
    
    if (!result) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }
  }
} 