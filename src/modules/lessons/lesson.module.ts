import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Lesson, LessonSchema } from '@/core/domain/entities/lesson.entity';
import { LESSON_REPOSITORY } from '@/core/application/interfaces/lesson.interface';
import { LessonRepository } from '@/core/infrastructure/persistence/repositories/lesson.repository';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';

// Import use cases
import { CreateLessonUseCase } from '@/core/application/use-cases/lesson/create-lesson.use-case';
import { GetLessonUseCase } from '@/core/application/use-cases/lesson/get-lesson.use-case';
import { GetLessonsUseCase } from '@/core/application/use-cases/lesson/get-lessons.use-case';
import { UpdateLessonUseCase } from '@/core/application/use-cases/lesson/update-lesson.use-case';
import { DeleteLessonUseCase } from '@/core/application/use-cases/lesson/delete-lesson.use-case';
import { UpdateLessonOrderUseCase } from '@/core/application/use-cases/lesson/update-lesson-order.use-case';
import { GetLessonContentUseCase } from '@/core/application/use-cases/lesson/get-lesson-content.use-case';
import { UpdateLessonContentUseCase } from '@/core/application/use-cases/lesson/update-lesson-content.use-case';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Lesson.name, schema: LessonSchema }]),
  ],
  controllers: [LessonController],
  providers: [
    LessonService,
    {
      provide: LESSON_REPOSITORY,
      useClass: LessonRepository,
    },
    // Register use cases
    CreateLessonUseCase,
    GetLessonUseCase,
    GetLessonsUseCase,
    UpdateLessonUseCase,
    DeleteLessonUseCase,
    UpdateLessonOrderUseCase,
    GetLessonContentUseCase,
    UpdateLessonContentUseCase,
  ],
  exports: [
    LessonService,
    CreateLessonUseCase,
    GetLessonUseCase,
    GetLessonsUseCase,
    UpdateLessonUseCase,
    DeleteLessonUseCase,
    UpdateLessonOrderUseCase,
    GetLessonContentUseCase,
    UpdateLessonContentUseCase,
  ],
})
export class LessonModule {} 