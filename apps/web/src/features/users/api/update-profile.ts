import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { useUser } from '@/lib/auth';
import { MutationConfig } from '@/lib/react-query';
import type { User, UserRole } from '@/types/api';
import { convertCamelToSnakeCase } from '@/utils';

const userRoles = ['user', 'editor', 'admin'] as const satisfies UserRole[];

export const updateProfileInputSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters.' }).optional(),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters.' }).optional(),
  additionalInfo: z.string().optional(),
  role: z.enum(userRoles).readonly().optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileInputSchema>;

export const updateProfile = ({ data }: { data: UpdateProfileInput }): Promise<User> => {
  return api.patch(`/users/me`, convertCamelToSnakeCase(data));
};

type UseUpdateProfileOptions = {
  mutationConfig?: MutationConfig<typeof updateProfile>;
};

export const useUpdateProfile = ({ mutationConfig }: UseUpdateProfileOptions = {}) => {
  const { refetch: refetchUser } = useUser();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      refetchUser();
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: updateProfile,
  });
};
