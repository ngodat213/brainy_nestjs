import { Injectable, Inject } from '@nestjs/common';
import { LESSON_REPOSITORY, ILessonRepository } from '../../interfaces/lesson.interface';
import { UpdateLessonOrderDto } from '../../dtos/lesson.dto';

@Injectable()
export class UpdateLessonOrderUseCase {
  constructor(
    @Inject(LESSON_REPOSITORY)
    private readonly lessonRepository: ILessonRepository,
  ) {}

  /**
   * Update the order of multiple lessons
   * @param updateLessonOrderDto The lessons with their new order
   * @returns Whether the update was successful
   */
  async execute(updateLessonOrderDto: UpdateLessonOrderDto): Promise<boolean> {
    return this.lessonRepository.updateOrder(updateLessonOrderDto.lessons);
  }
} 