import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { LESSON_REPOSITORY, ILessonRepository } from '../../interfaces/lesson.interface';
import { UpdateLessonDto } from '../../dtos/lesson.dto';
import { Lesson } from '@/core/domain/entities/lesson.entity';

@Injectable()
export class UpdateLessonUseCase {
  constructor(
    @Inject(LESSON_REPOSITORY)
    private readonly lessonRepository: ILessonRepository,
  ) {}

  /**
   * Update a lesson
   * @param id The lesson ID
   * @param updateLessonDto The updated lesson data
   * @returns The updated lesson
   * @throws NotFoundException if lesson not found
   */
  async execute(id: string, updateLessonDto: UpdateLessonDto): Promise<Lesson> {
    const lesson = await this.lessonRepository.update(id, updateLessonDto);
    
    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }
    
    return lesson;
  }
} 