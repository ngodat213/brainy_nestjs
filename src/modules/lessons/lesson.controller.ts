import { Controller, Get, Post, Put, Delete, Body, Param, Query, Req } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto, LessonResponseDto, UpdateLessonDto, UpdateLessonOrderDto } from '@/core/application/dtos/lesson.dto';
import { LessonSwagger } from './swagger/lesson.swagger';
import { Request } from 'express';
import { Public } from '@/shared/decorators/public.decorator';
import { extractPaginationParams, PaginatedResponse } from '@/shared/utils/pagination.utils';

@Controller('lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post()
  @LessonSwagger.createLesson()
  async create(@Body() createLessonDto: CreateLessonDto): Promise<LessonResponseDto> {
    return this.lessonService.create(createLessonDto);
  }

  @Get()
  @Public()
  @LessonSwagger.getAllLessons()
  async findAll(
    @Req() req: Request,
    @Query('level') level?: string,
    @Query('category') category?: string,
    @Query('published') published?: boolean,
  ): Promise<PaginatedResponse<LessonResponseDto>> {
    const paginationParams = extractPaginationParams(req);
    
    return this.lessonService.findAllPaginated(
      { level, category, published },
      paginationParams
    );
  }

  @Get(':id')
  @Public()
  @LessonSwagger.getLessonById()
  async findOne(@Param('id') id: string): Promise<LessonResponseDto> {
    return this.lessonService.findOne(id);
  }

  @Put(':id')
  @LessonSwagger.updateLesson()
  async update(
    @Param('id') id: string,
    @Body() updateLessonDto: UpdateLessonDto,
  ): Promise<LessonResponseDto> {
    return this.lessonService.update(id, updateLessonDto);
  }

  @Delete(':id')
  @LessonSwagger.deleteLesson()
  async remove(@Param('id') id: string): Promise<void> {
    return this.lessonService.remove(id);
  }

  @Get(':id/content')
  @Public()
  @LessonSwagger.getLessonContent()
  async getContent(@Param('id') id: string): Promise<string> {
    return this.lessonService.getContent(id);
  }

  @Put(':id/content')
  @LessonSwagger.updateLessonContent()
  async updateContent(
    @Param('id') id: string,
    @Body() content: string,
  ): Promise<void> {
    return this.lessonService.updateContent(id, content);
  }

  @Put('order')
  @LessonSwagger.updateLessonOrder()
  async updateOrder(@Body() updateLessonOrderDto: UpdateLessonOrderDto): Promise<boolean> {
    return this.lessonService.updateOrder(updateLessonOrderDto);
  }
} 