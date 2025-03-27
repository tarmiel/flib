import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { type QueryConfig } from '@/lib/react-query';
import { type User } from '@/types/api';

export const getResources = (): Promise<{ data: User[] }> => {
  return api.get(`/resources`, {
    params: {
      sort: 'newest',
    },
  });
};

export const getResourcesQueryOptions = () => {
  return queryOptions({
    queryKey: ['resources'],
    queryFn: getResources,
  });
};

type UseResourcesOptions = {
  queryConfig?: QueryConfig<typeof getResourcesQueryOptions>;
};

export const useResources = ({ queryConfig }: UseResourcesOptions = {}) => {
  return useQuery({
    ...getResourcesQueryOptions(),
    ...queryConfig,
  });
};
