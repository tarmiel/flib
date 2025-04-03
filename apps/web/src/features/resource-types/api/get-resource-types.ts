import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { type QueryConfig } from '@/lib/react-query';
import { type ResourceType } from '@/types/api';

export const getResourceTypes = async (): Promise<ResourceType[]> => {
  const response = await api.get(`/resource-types`);

  return response.data;
};

export const getResourceTypesQueryOptions = () => {
  return queryOptions({
    queryKey: ['resource-types'],
    queryFn: () => getResourceTypes(),
  });
};

type UseResourceTypesOptions = {
  queryConfig?: QueryConfig<typeof getResourceTypesQueryOptions>;
};

export const useResourceTypes = ({ queryConfig }: UseResourceTypesOptions = {}) => {
  return useQuery({
    ...getResourceTypesQueryOptions(),
    ...queryConfig,
  });
};
