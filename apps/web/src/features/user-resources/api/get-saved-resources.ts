import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { type ResourceWithSavedStatus } from '@/types/api';

export const getSavedResources = async (): Promise<ResourceWithSavedStatus[]> => {
  const response = await api.get(`/saved-resources`);

  return response.data;
};

export const getSavedResourcesQueryOptions = () => {
  return queryOptions({
    queryKey: ['saved-resources'],
    queryFn: getSavedResources,
  });
};

type UseSavedResourcesOptions = {
  queryConfig?: QueryConfig<typeof getSavedResourcesQueryOptions>;
};

export const useSavedResources = ({ queryConfig }: UseSavedResourcesOptions = {}) => {
  return useQuery({
    ...getSavedResourcesQueryOptions(),
    ...queryConfig,
  });
};
