import { IsString } from 'class-validator';

export class CreateResourceTypeDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
