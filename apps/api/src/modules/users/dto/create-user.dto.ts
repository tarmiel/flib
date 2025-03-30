export class CreateUserDto {
  email: string;
  first_name: string;
  last_name: string;
  password_hash: string;
  additionalInfo?: string;
}
