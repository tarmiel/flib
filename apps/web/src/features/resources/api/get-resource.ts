import { useQuery, queryOptions } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Resource, type ResourceWithSavedStatus } from '@/types/api';

export const getResource = async ({
  resourceId,
}: {
  resourceId: Resource['id'];
}): Promise<ResourceWithSavedStatus> => {
  const response = await api.get(`/resources/${resourceId}`);

  return response.data;
};

export const getResourceQueryOptions = (resourceId: Resource['id']) => {
  return queryOptions({
    queryKey: ['resources', resourceId],
    queryFn: () => getResource({ resourceId }),
  });
};

type UseResourceOptions = {
  resourceId: Resource['id'];
  queryConfig?: QueryConfig<typeof getResourceQueryOptions>;
};

export const useResource = ({ resourceId, queryConfig }: UseResourceOptions) => {
  return useQuery({
    ...getResourceQueryOptions(resourceId),
    ...queryConfig,
  });
};
