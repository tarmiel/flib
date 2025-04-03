import {
  IsString,
  IsOptional,
  IsInt,
  IsDate,
  IsArray,
  IsUrl,
  IsNotEmpty,
  ArrayMinSize,
  IsEnum,
  IsObject,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';
import { FileFormat } from '@prisma/client';

export class CreateResourceDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  category_id: number;

  @Type(() => Date)
  @IsDate()
  publication_date: Date;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @IsNotEmpty()
  authors: string[];

  @IsArray()
  @ArrayMinSize(0)
  @IsString({ each: true })
  keywords: string[] = [];

  @IsString()
  file_name: string;

  @IsString()
  @IsEnum(FileFormat)
  file_format: FileFormat;

  @IsString()
  file_size: string;

  @IsOptional()
  @IsString()
  preview_image_name?: string;

  @IsOptional()
  @IsString()
  citation?: string;

  @IsOptional()
  @IsObject()
  @ValidateIf((object, value) => value !== null)
  additional_info?: Record<string, unknown> | null;

  @IsInt()
  resource_type_id: number;
}
