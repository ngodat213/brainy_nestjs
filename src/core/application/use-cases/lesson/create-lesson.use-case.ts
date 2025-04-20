import { Injectable, Inject } from '@nestjs/common';
import { LESSON_REPOSITORY, ILessonRepository } from '../../interfaces/lesson.interface';
import { CreateLessonDto } from '../../dtos/lesson.dto';
import { Lesson } from '@/core/domain/entities/lesson.entity';

@Injectable()
export class CreateLessonUseCase {
  constructor(
    @Inject(LESSON_REPOSITORY)
    private readonly lessonRepository: ILessonRepository,
  ) {}

  /**
   * Creates a new lesson
   * @param createLessonDto The lesson data
   * @returns The created lesson
   */
  async execute(createLessonDto: CreateLessonDto): Promise<Lesson> {
    return this.lessonRepository.create(createLessonDto);
  }
} 