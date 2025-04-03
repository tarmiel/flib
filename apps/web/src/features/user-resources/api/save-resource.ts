import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { type Resource, type SavedResource } from '@/types/api';
import { getSavedResourcesQueryOptions } from './get-saved-resources';
// import { getResourceQueryOptions } from '@/features/resources/api/get-resource';

export type SaveResourceInput = {
  resourceId: Resource['id'];
};

export const saveResource = async ({
  data,
}: {
  data: SaveResourceInput;
}): Promise<SavedResource> => {
  const response = await api.post('/saved-resources', data);

  return response.data;
};

type UseSaveResourceOptions = {
  mutationConfig?: MutationConfig<typeof saveResource>;
};

export const useSaveResource = ({ mutationConfig }: UseSaveResourceOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getSavedResourcesQueryOptions().queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: saveResource,
  });

  // return useMutation({
  //   onMutate: async ({ data }) => {
  //     const { resourceId } = data;

  //     // Cancel any outgoing refetches
  //     await queryClient.cancelQueries({ queryKey: getResourceQueryOptions(resourceId).queryKey });

  //     // Snapshot the previous value
  //     const previousResource = queryClient.getQueryData<Resource>(['resources', resourceId]);

  //     // Optimistically update the resource
  //     queryClient.setQueryData(
  //       getResourceQueryOptions(resourceId).queryKey,
  //       (old: Resource | undefined) => {
  //         if (!old) return old;
  //         return {
  //           ...old,
  //           isSaved: true,
  //         };
  //       },
  //     );

  //     // Return context for rollback
  //     return { previousResource };
  //   },
  //   onError: (error, variables, context) => {
  //     // Rollback to previous state on error
  //     queryClient.setQueryData(
  //       getResourceQueryOptions(variables.data.resourceId).queryKey,
  //       context?.previousResource,
  //     );
  //   },
  //   onSuccess: (data, variables, context) => {
  //     // Invalidate both the resource and saved resources queries
  //     queryClient.invalidateQueries({
  //       queryKey: getResourceQueryOptions(variables.data.resourceId).queryKey,
  //     });
  //     queryClient.invalidateQueries({
  //       queryKey: getSavedResourcesQueryOptions().queryKey,
  //     });
  //     onSuccess?.(data, variables, context);
  //   },
  //   onSettled: (data, error, variables) => {
  //     // Ensure fresh data after settlement
  //     queryClient.invalidateQueries({
  //       queryKey: getResourceQueryOptions(variables?.data.resourceId).queryKey,
  //     });
  //     queryClient.invalidateQueries({ queryKey: getSavedResourcesQueryOptions().queryKey });
  //   },
  //   ...restConfig,
  //   mutationFn: saveResource,
  // });
};
