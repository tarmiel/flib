import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import type { Resource } from '@/types/api';
import { getResourcesQueryOptions } from './get-resources';

export const deleteResource = ({ resourceId }: { resourceId: Resource['id'] }) => {
  return api.delete(`/resources/${resourceId}`);
};

export const deleteResources = ({ resourceIds }: { resourceIds: Resource['id'][] }) => {
  const deletePromises = resourceIds.map((resourceId) => deleteResource({ resourceId }));
  return Promise.all(deletePromises);
};

type UseRemoveResourceOptions = {
  mutationConfig?: MutationConfig<typeof deleteResources>;
};

export const useDeleteResources = ({ mutationConfig }: UseRemoveResourceOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: getResourcesQueryOptions().queryKey,
      });
    },
    ...restConfig,
    mutationFn: deleteResources,
  });
};
