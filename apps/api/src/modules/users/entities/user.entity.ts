export class UserEntity {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  roleId: number;
  additionalInfo?: string;
}
