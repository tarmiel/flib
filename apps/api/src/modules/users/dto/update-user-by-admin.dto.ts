import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ROLES, Roles } from 'src/modules/iam/authorization/roles.constants';

export class UpdateUserByAdminDto {
  @IsString()
  @IsOptional()
  first_name?: string;

  @IsString()
  @IsOptional()
  last_name?: string;

  @IsString()
  @IsOptional()
  additional_info?: string;

  @IsEnum(ROLES)
  @IsOptional()
  role?: Roles;
}
