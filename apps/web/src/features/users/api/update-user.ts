import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import type { User, UserRole } from '@/types/api';
import { convertCamelToSnakeCase } from '@/utils';

const userRoles = ['user', 'editor', 'admin'] as const satisfies UserRole[];

export const updateUserInputSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters.' }).optional(),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters.' }).optional(),
  additionalInfo: z.string().optional(),
  role: z.enum(userRoles).readonly().optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserInputSchema>;
type UpdateUserParams = { data: UpdateUserInput; userId: User['id'] };

export const updateUser = ({ data, userId }: UpdateUserParams): Promise<User> => {
  return api.patch(`/users/${userId}`, convertCamelToSnakeCase(data));
};

type UseUpdateUserOptions = {
  mutationConfig?: MutationConfig<typeof updateUser>;
};

export const useUpdateUser = ({ mutationConfig = {} }: UseUpdateUserOptions) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: updateUser,
  });
};
