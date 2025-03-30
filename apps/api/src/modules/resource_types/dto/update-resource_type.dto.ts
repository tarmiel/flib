import { PartialType } from '@nestjs/swagger';
import { CreateResourceTypeDto } from './create-resource_type.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateResourceTypeDto extends PartialType(CreateResourceTypeDto) {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
