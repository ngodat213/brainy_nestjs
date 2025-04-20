import { Injectable } from '@nestjs/common';
import { CreateLessonDto, UpdateLessonDto, UpdateLessonOrderDto, LessonResponseDto } from '@/core/application/dtos/lesson.dto';
import { Lesson } from '@/core/domain/entities/lesson.entity';
import { PaginationParams, PaginatedResponse, createPaginatedResponse } from '@/shared/utils/pagination.utils';

// Import use cases
import { CreateLessonUseCase } from '@/core/application/use-cases/lesson/create-lesson.use-case';
import { GetLessonUseCase } from '@/core/application/use-cases/lesson/get-lesson.use-case';
import { GetLessonsUseCase } from '@/core/application/use-cases/lesson/get-lessons.use-case';
import { UpdateLessonUseCase } from '@/core/application/use-cases/lesson/update-lesson.use-case';
import { DeleteLessonUseCase } from '@/core/application/use-cases/lesson/delete-lesson.use-case';
import { UpdateLessonOrderUseCase } from '@/core/application/use-cases/lesson/update-lesson-order.use-case';
import { GetLessonContentUseCase } from '@/core/application/use-cases/lesson/get-lesson-content.use-case';
import { UpdateLessonContentUseCase } from '@/core/application/use-cases/lesson/update-lesson-content.use-case';

@Injectable()
export class LessonService {
  constructor(
    private readonly createLessonUseCase: CreateLessonUseCase,
    private readonly getLessonUseCase: GetLessonUseCase,
    private readonly getLessonsUseCase: GetLessonsUseCase,
    private readonly updateLessonUseCase: UpdateLessonUseCase,
    private readonly deleteLessonUseCase: DeleteLessonUseCase,
    private readonly updateLessonOrderUseCase: UpdateLessonOrderUseCase,
    private readonly getLessonContentUseCase: GetLessonContentUseCase,
    private readonly updateLessonContentUseCase: UpdateLessonContentUseCase,
  ) {}

  private mapToDto(lesson: any): LessonResponseDto {
    const mongoDocument = lesson as any;
    return {
      id: mongoDocument._id?.toString() || '',
      title: lesson.title || '',
      description: lesson.description || '',
      level: lesson.level || '',
      category: lesson.category || '',
      topic: lesson.topic || '',
      contentFileId: lesson.contentFileId || '',
      contentUrl: lesson.contentUrl || '',
      thumbnailId: lesson.thumbnailId,
      thumbnailUrl: lesson.thumbnailUrl,
      order: lesson.order || 0,
      isPublished: lesson.isPublished || false,
      prerequisites: lesson.prerequisites || [],
      createdAt: mongoDocument.createdAt || new Date(),
      updatedAt: mongoDocument.updatedAt || new Date(),
    };
  }

  private mapToDtoList(lessons: any[]): LessonResponseDto[] {
    return lessons.map(lesson => this.mapToDto(lesson));
  }

  async create(createLessonDto: CreateLessonDto): Promise<LessonResponseDto> {
    const lesson = await this.createLessonUseCase.execute(createLessonDto);
    return this.mapToDto(lesson);
  }

  async findAll(filters?: {
    level?: string;
    category?: string;
    published?: boolean;
  }): Promise<LessonResponseDto[]> {
    const lessons = await this.getLessonsUseCase.execute(filters);
    return this.mapToDtoList(lessons);
  }

  async findAllPaginated(
    filters?: {
      level?: string;
      category?: string;
      published?: boolean;
    },
    paginationParams?: PaginationParams
  ): Promise<PaginatedResponse<LessonResponseDto>> {
    // Lấy tất cả dữ liệu phù hợp với bộ lọc
    const allLessons = await this.getLessonsUseCase.execute(filters);
    
    // Tính toán số lượng
    const total = allLessons.length;
    
    // Nếu không có tham số phân trang, trả về tất cả
    if (!paginationParams) {
      return createPaginatedResponse(
        this.mapToDtoList(allLessons),
        total,
        { page: 1, limit: total }
      );
    }
    
    // Thực hiện phân trang thủ công (thực tế nên làm ở repository)
    const { page, limit, sortBy, sortOrder } = paginationParams;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    // Sắp xếp dữ liệu nếu cần
    let sortedLessons = [...allLessons];
    if (sortBy) {
      sortedLessons.sort((a: any, b: any) => {
        // Sắp xếp theo trường
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        
        // So sánh giá trị
        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    // Lấy dữ liệu cho trang hiện tại
    const paginatedLessons = sortedLessons.slice(startIndex, endIndex);
    
    // Tạo response phân trang
    return createPaginatedResponse(
      this.mapToDtoList(paginatedLessons),
      total,
      paginationParams
    );
  }

  async findOne(id: string): Promise<LessonResponseDto> {
    const lesson = await this.getLessonUseCase.execute(id);
    return this.mapToDto(lesson);
  }

  async update(id: string, updateLessonDto: UpdateLessonDto): Promise<LessonResponseDto> {
    const lesson = await this.updateLessonUseCase.execute(id, updateLessonDto);
    return this.mapToDto(lesson);
  }

  async remove(id: string): Promise<void> {
    return this.deleteLessonUseCase.execute(id);
  }

  async updateOrder(updateLessonOrderDto: UpdateLessonOrderDto): Promise<boolean> {
    return this.updateLessonOrderUseCase.execute(updateLessonOrderDto);
  }

  async getContent(id: string): Promise<string> {
    return this.getLessonContentUseCase.execute(id);
  }

  async updateContent(id: string, content: string): Promise<void> {
    return this.updateLessonContentUseCase.execute(id, content);
  }
} 