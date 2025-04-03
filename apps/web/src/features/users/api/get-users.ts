import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { type QueryConfig } from '@/lib/react-query';
import { type Meta, type Paginated, type User } from '@/types/api';

export type UserFilterParams = Partial<Pick<Meta, 'page' | 'pageSize'>> & {
  firstName?: string;
  role?: string[];
};

const sanitizeFilterParams = ({
  page = 1,
  pageSize = 10,
  firstName = '',
  role = [],
}: UserFilterParams = {}): Partial<UserFilterParams> => {
  const prepared: Record<string, unknown> = { page, pageSize };

  if (firstName.trim()) {
    prepared.firstName = firstName;
  }

  if (role.length > 0) {
    prepared.role = role.join(',');
  }

  return prepared;
};

export const getUsers = async (filters: UserFilterParams = {}): Promise<Paginated<User>> => {
  const filterParams = sanitizeFilterParams(filters);

  const response = await api.get(`/users`, {
    params: filterParams,
  });

  return response.data;
};

export const userQueryKeys = {
  base: ['users'] as const,
  list: (filters: UserFilterParams) =>
    [...userQueryKeys.base, sanitizeFilterParams(filters)] as const,
};

export const getUsersQueryOptions = (filters: UserFilterParams = {}) => {
  return queryOptions({
    queryKey: userQueryKeys.list(filters),
    queryFn: () => getUsers(filters),
  });
};

type UseUsersOptions = {
  queryConfig?: QueryConfig<typeof getUsersQueryOptions>;
  filters?: UserFilterParams;
};

export const useUsers = ({ queryConfig = {}, filters = {} }: UseUsersOptions = {}) => {
  return useQuery({
    ...getUsersQueryOptions(filters),
    ...queryConfig,
  });
};
