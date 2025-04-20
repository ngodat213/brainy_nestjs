import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber, IsArray } from 'class-validator';

export class CreateLessonDto {
  @ApiProperty({ description: 'Lesson title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Lesson description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Lesson level (A1, A2, B1, B2, C1, C2)' })
  @IsString()
  @IsNotEmpty()
  level: string;

  @ApiProperty({ description: 'Lesson category (Grammar, Vocabulary, Speaking, etc.)' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ description: 'Lesson topic (Present Simple, Past Continuous, etc.)' })
  @IsString()
  @IsNotEmpty()
  topic: string;

  @ApiProperty({ description: 'Content file ID in Cloudinary' })
  @IsString()
  @IsNotEmpty()
  contentFileId: string;

  @ApiProperty({ description: 'Content URL' })
  @IsString()
  @IsNotEmpty()
  contentUrl: string;

  @ApiProperty({ description: 'Thumbnail file ID in Cloudinary', required: false })
  @IsString()
  @IsOptional()
  thumbnailId?: string;

  @ApiProperty({ description: 'Thumbnail URL', required: false })
  @IsString()
  @IsOptional()
  thumbnailUrl?: string;

  @ApiProperty({ description: 'Lesson order' })
  @IsNumber()
  @IsNotEmpty()
  order: number;

  @ApiProperty({ description: 'Whether the lesson is published' })
  @IsBoolean()
  @IsNotEmpty()
  isPublished: boolean;

  @ApiProperty({ description: 'List of prerequisite lesson IDs', type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  prerequisites?: string[];
}

export class UpdateLessonDto {
  @ApiProperty({ description: 'Lesson title', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'Lesson description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Lesson level', required: false })
  @IsString()
  @IsOptional()
  level?: string;

  @ApiProperty({ description: 'Lesson category', required: false })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({ description: 'Lesson topic', required: false })
  @IsString()
  @IsOptional()
  topic?: string;

  @ApiProperty({ description: 'Content file ID in Cloudinary', required: false })
  @IsString()
  @IsOptional()
  contentFileId?: string;

  @ApiProperty({ description: 'Content URL', required: false })
  @IsString()
  @IsOptional()
  contentUrl?: string;

  @ApiProperty({ description: 'Thumbnail file ID in Cloudinary', required: false })
  @IsString()
  @IsOptional()
  thumbnailId?: string;

  @ApiProperty({ description: 'Thumbnail URL', required: false })
  @IsString()
  @IsOptional()
  thumbnailUrl?: string;

  @ApiProperty({ description: 'Lesson order', required: false })
  @IsNumber()
  @IsOptional()
  order?: number;

  @ApiProperty({ description: 'Whether the lesson is published', required: false })
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @ApiProperty({ description: 'List of prerequisite lesson IDs', type: [String], required: false })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  prerequisites?: string[];
}

export class UpdateLessonOrderDto {
  @ApiProperty({ description: 'List of lessons with their new order', type: [Object] })
  @IsArray()
  @IsNotEmpty()
  lessons: { id: string; order: number }[];
}

export class LessonResponseDto {
  @ApiProperty({ description: 'Lesson ID' })
  id: string;

  @ApiProperty({ description: 'Lesson title' })
  title: string;

  @ApiProperty({ description: 'Lesson description' })
  description: string;

  @ApiProperty({ description: 'Lesson level' })
  level: string;

  @ApiProperty({ description: 'Lesson category' })
  category: string;

  @ApiProperty({ description: 'Lesson topic' })
  topic: string;

  @ApiProperty({ description: 'Content file ID in Cloudinary' })
  contentFileId: string;

  @ApiProperty({ description: 'Content URL' })
  contentUrl: string;

  @ApiProperty({ description: 'Thumbnail file ID in Cloudinary', required: false })
  thumbnailId?: string;

  @ApiProperty({ description: 'Thumbnail URL', required: false })
  thumbnailUrl?: string;

  @ApiProperty({ description: 'Lesson order' })
  order: number;

  @ApiProperty({ description: 'Whether the lesson is published' })
  isPublished: boolean;

  @ApiProperty({ description: 'List of prerequisite lesson IDs', type: [String] })
  prerequisites: string[];

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  updatedAt: Date;
} 