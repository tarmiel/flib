import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getSavedResourcesQueryOptions } from './get-saved-resources';
import type { Resource } from '@/types/api';

export const deleteSavedResource = ({ savedResourceId }: { savedResourceId: Resource['id'] }) => {
  return api.delete(`/saved-resources/${savedResourceId}`);
};

type UseRemoveSavedResourceOptions = {
  mutationConfig?: MutationConfig<typeof deleteSavedResource>;
};

export const useRemoveSavedResource = ({ mutationConfig }: UseRemoveSavedResourceOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getSavedResourcesQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteSavedResource,
  });
};
