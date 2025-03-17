import type { UserRole } from '@/types/api';
import { z } from 'zod';
const userRoles = ['USER', 'EDITOR', 'ADMIN'] as const satisfies UserRole[];

export const inviteUserInputSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  role: z.enum(userRoles).readonly(),
});

export type InviteUserInput = z.infer<typeof inviteUserInputSchema>;
