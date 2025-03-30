import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Roles, ROLES } from 'src/modules/iam/authorization/roles.constants';

export class QueryUserDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @Transform(
    ({ value }) => value.split(',').map((item: string) => item.trim()),
    { toClassOnly: true },
  )
  @IsArray()
  @IsEnum(ROLES, { each: true })
  role?: Roles[];

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
}
