import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { LESSON_REPOSITORY, ILessonRepository } from '../../interfaces/lesson.interface';

@Injectable()
export class GetLessonContentUseCase {
  constructor(
    @Inject(LESSON_REPOSITORY)
    private readonly lessonRepository: ILessonRepository,
  ) {}

  /**
   * Get a lesson's content by ID
   * @param id The lesson ID
   * @returns The lesson content URL
   * @throws NotFoundException if lesson not found
   */
  async execute(id: string): Promise<string> {
    const lesson = await this.lessonRepository.findById(id);
    
    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }
    
    return lesson.contentUrl;
  }
} 