import { FileFormat } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  Max,
  Length,
  IsArray,
  IsEnum,
} from 'class-validator';

export type SortOptions =
  | 'created_desc'
  | 'created_asc'
  | 'title_desc'
  | 'title_asc';

export class QueryResourceDto {
  @IsOptional()
  @IsString()
  @Length(1, 255)
  q?: string; // search resource by title, description, authors, keywords

  @IsOptional()
  @IsString()
  sort?: SortOptions;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @Max(100)
  pageSize: number = 10;

  @IsOptional()
  @Transform(
    ({ value }) => {
      if (typeof value === 'string') {
        return value.split(',').map((item: string) => item.trim());
      }
      return value;
    },
    { toClassOnly: true },
  )
  @IsArray()
  @IsString({ each: true })
  resourceType?: string[];

  @IsOptional()
  @Transform(
    ({ value }) => {
      if (typeof value === 'string') {
        return value.split(',').map((item: string) => item.trim());
      }
      return value;
    },
    { toClassOnly: true },
  )
  @IsArray()
  @IsString({ each: true })
  category?: string[];

  @IsOptional()
  @Transform(
    ({ value }) => {
      if (typeof value === 'string') {
        return value.split(',').map((item: string) => item.trim());
      }
      return value;
    },
    { toClassOnly: true },
  )
  @IsArray()
  @IsEnum(FileFormat, { each: true })
  fileFormat?: FileFormat[];

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear())
  yearFrom?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear())
  yearTo?: number;
}
