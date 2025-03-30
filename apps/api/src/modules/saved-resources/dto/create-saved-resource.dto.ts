import { IsNumber } from 'class-validator';

export class CreateSavedResourceDto {
  @IsNumber()
  resource_id: number;
}
