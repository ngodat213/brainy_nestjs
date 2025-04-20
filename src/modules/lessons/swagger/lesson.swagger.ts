import { CreateLessonDto, UpdateLessonDto, UpdateLessonOrderDto, LessonResponseDto } from '@/core/application/dtos/lesson.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';

export const LessonSwagger = {
  createLesson: () => {
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor,
    ) {
      ApiTags('Lessons')(target, propertyKey, descriptor);
      ApiOperation({ summary: 'Create a new lesson' })(target, propertyKey, descriptor);
      ApiBody({ type: CreateLessonDto })(target, propertyKey, descriptor);
      ApiResponse({ 
        status: 201, 
        description: 'Lesson created successfully', 
        type: LessonResponseDto 
      })(target, propertyKey, descriptor);
      ApiResponse({
        status: 400,
        description: 'Invalid input data'
      })(target, propertyKey, descriptor);
    };
  },

  getAllLessons: () => {
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor,
    ) {
      ApiTags('Lessons')(target, propertyKey, descriptor);
      ApiOperation({ summary: 'Get all lessons' })(target, propertyKey, descriptor);
      ApiQuery({ name: 'level', required: false, description: 'Filter by level' })(target, propertyKey, descriptor);
      ApiQuery({ name: 'category', required: false, description: 'Filter by category' })(target, propertyKey, descriptor);
      ApiQuery({ name: 'published', required: false, description: 'Filter by published status' })(target, propertyKey, descriptor);
      ApiQuery({ name: 'page', required: false, description: 'Page number (starts from 1)', type: Number })(target, propertyKey, descriptor);
      ApiQuery({ name: 'limit', required: false, description: 'Items per page (default: 10)', type: Number })(target, propertyKey, descriptor);
      ApiQuery({ name: 'sortBy', required: false, description: 'Field to sort by', type: String })(target, propertyKey, descriptor);
      ApiQuery({ name: 'sortOrder', required: false, description: 'Sort order (asc or desc)', enum: ['asc', 'desc'] })(target, propertyKey, descriptor);
      ApiResponse({ 
        status: 200, 
        description: 'List of lessons', 
        schema: {
          properties: {
            data: {
              type: 'array',
              items: { $ref: '#/components/schemas/LessonResponseDto' }
            },
            pagination: {
              type: 'object',
              properties: {
                total: { type: 'number', example: 100 },
                page: { type: 'number', example: 1 },
                limit: { type: 'number', example: 10 },
                totalPages: { type: 'number', example: 10 },
                hasNext: { type: 'boolean', example: true },
                hasPrev: { type: 'boolean', example: false }
              }
            }
          }
        }
      })(target, propertyKey, descriptor);
    };
  },

  getLessonById: () => {
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor,
    ) {
      ApiTags('Lessons')(target, propertyKey, descriptor);
      ApiOperation({ summary: 'Get a lesson by ID' })(target, propertyKey, descriptor);
      ApiParam({ name: 'id', description: 'Lesson ID' })(target, propertyKey, descriptor);
      ApiResponse({ 
        status: 200, 
        description: 'Lesson found', 
        type: LessonResponseDto 
      })(target, propertyKey, descriptor);
      ApiResponse({
        status: 404,
        description: 'Lesson not found'
      })(target, propertyKey, descriptor);
    };
  },

  updateLesson: () => {
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor,
    ) {
      ApiTags('Lessons')(target, propertyKey, descriptor);
      ApiOperation({ summary: 'Update a lesson' })(target, propertyKey, descriptor);
      ApiParam({ name: 'id', description: 'Lesson ID' })(target, propertyKey, descriptor);
      ApiBody({ type: UpdateLessonDto })(target, propertyKey, descriptor);
      ApiResponse({ 
        status: 200, 
        description: 'Lesson updated successfully', 
        type: LessonResponseDto 
      })(target, propertyKey, descriptor);
      ApiResponse({
        status: 404,
        description: 'Lesson not found'
      })(target, propertyKey, descriptor);
    };
  },

  deleteLesson: () => {
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor,
    ) {
      ApiTags('Lessons')(target, propertyKey, descriptor);
      ApiOperation({ summary: 'Delete a lesson' })(target, propertyKey, descriptor);
      ApiParam({ name: 'id', description: 'Lesson ID' })(target, propertyKey, descriptor);
      ApiResponse({
        status: 200,
        description: 'Lesson deleted successfully'
      })(target, propertyKey, descriptor);
      ApiResponse({
        status: 404,
        description: 'Lesson not found'
      })(target, propertyKey, descriptor);
    };
  },

  getLessonContent: () => {
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor,
    ) {
      ApiTags('Lessons')(target, propertyKey, descriptor);
      ApiOperation({ summary: 'Get lesson content' })(target, propertyKey, descriptor);
      ApiParam({ name: 'id', description: 'Lesson ID' })(target, propertyKey, descriptor);
      ApiResponse({
        status: 200,
        description: 'Lesson content retrieved successfully'
      })(target, propertyKey, descriptor);
      ApiResponse({
        status: 404,
        description: 'Lesson not found'
      })(target, propertyKey, descriptor);
    };
  },

  updateLessonContent: () => {
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor,
    ) {
      ApiTags('Lessons')(target, propertyKey, descriptor);
      ApiOperation({ summary: 'Update lesson content' })(target, propertyKey, descriptor);
      ApiParam({ name: 'id', description: 'Lesson ID' })(target, propertyKey, descriptor);
      ApiBody({ type: String })(target, propertyKey, descriptor);
      ApiResponse({
        status: 200,
        description: 'Lesson content updated successfully'
      })(target, propertyKey, descriptor);
      ApiResponse({
        status: 404,
        description: 'Lesson not found'
      })(target, propertyKey, descriptor);
    };
  },

  updateLessonOrder: () => {
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor,
    ) {
      ApiTags('Lessons')(target, propertyKey, descriptor);
      ApiOperation({ summary: 'Update lesson order' })(target, propertyKey, descriptor);
      ApiBody({ type: UpdateLessonOrderDto })(target, propertyKey, descriptor);
      ApiResponse({
        status: 200,
        description: 'Lesson order updated successfully'
      })(target, propertyKey, descriptor);
      ApiResponse({
        status: 400,
        description: 'Invalid input data'
      })(target, propertyKey, descriptor);
    };
  },
}; 