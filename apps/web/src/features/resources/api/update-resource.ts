import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Resource } from '@/types/api';

import { convertCamelToSnakeCase } from '@/utils';
import type { CreateResourceInput } from './create-resource';
import { getResourceQueryOptions } from './get-resource';
import { getResourcesQueryOptions } from './get-resources';

export type UpdateResourceInput = CreateResourceInput;

export const createResource = async ({
  data,
  resourceId,
}: {
  data: UpdateResourceInput;
  resourceId: Resource['id'];
}): Promise<Resource> => {
  const response = await api.put(`/resources/${resourceId}`, convertCamelToSnakeCase(data));

  return response.data;
};

type UseUpdateResourceOptions = {
  mutationConfig?: MutationConfig<typeof createResource>;
};

export const useUpdateResource = ({ mutationConfig }: UseUpdateResourceOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getResourcesQueryOptions().queryKey,
      });

      queryClient.refetchQueries({
        queryKey: getResourceQueryOptions(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: createResource,
  });
};
