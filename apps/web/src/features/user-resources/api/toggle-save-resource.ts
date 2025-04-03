import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getResourceQueryOptions } from '@/features/resources/api/get-resource';
import { getResourcesQueryOptions } from '@/features/resources/api/get-resources';
import { MutationConfig } from '@/lib/react-query';
import { type Resource } from '@/types/api';
import { getSavedResourcesQueryOptions } from './get-saved-resources';
import { deleteSavedResource } from './remove-saved-resource';
import { saveResource } from './save-resource';
// import { getResourceQueryOptions } from '@/features/resources/api/get-resource';

export type SaveResourceInput = {
  resourceId: Resource['id'];
};

export type ToggleSaveResourceInput = SaveResourceInput & {
  isSaved: boolean;
};

const toggleSaveResource = async ({ resourceId, isSaved }: ToggleSaveResourceInput) => {
  if (isSaved) {
    return deleteSavedResource({ resourceId });
  } else {
    return saveResource({ resourceId });
  }
};

type UseToggleSaveResourceOptions = {
  mutationConfig?: MutationConfig<typeof toggleSaveResource>;
};

export const useToggleSaveResource = ({ mutationConfig }: UseToggleSaveResourceOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, variables, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getSavedResourcesQueryOptions().queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: getResourcesQueryOptions().queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: getResourceQueryOptions(variables.resourceId).queryKey,
      });
      onSuccess?.(data, variables, ...args);
    },
    ...restConfig,
    mutationFn: toggleSaveResource,
  });

  //   return useMutation({
  //     onMutate: async (data): Promise<any> => {
  //       // const { resourceId, isSaved } = data;
  //       // // Cancel any outgoing refetches
  //       // await queryClient.cancelQueries({ queryKey: getSavedResourcesQueryOptions().queryKey });
  //       // await queryClient.cancelQueries({ queryKey: getResourcesQueryOptions().queryKey });
  //       // await queryClient.cancelQueries({ queryKey: getResourceQueryOptions(resourceId).queryKey });
  //       // const previousSavedResources = queryClient.getQueryData<ResourceWithSavedStatus[]>(
  //       //   getSavedResourcesQueryOptions().queryKey,
  //       // );
  //       // const previousResources = queryClient.getQueryData<ResourceWithSavedStatus[]>(
  //       //   getResourcesQueryOptions().queryKey,
  //       // );
  //       // const previousResource = queryClient.getQueryData<ResourceWithSavedStatus[]>(
  //       //   getResourceQueryOptions(resourceId).queryKey,
  //       // );
  //       // queryClient.setQueryData(
  //       //   [...getSavedResourcesQueryOptions().queryKey],
  //       //   (old: ResourceWithSavedStatus[] | undefined) => {
  //       //     const oldSavedResources = old?.filter((savedResource) => savedResource.id === resourceId);
  //       //     if (!oldSavedResources || oldSavedResources.length === 0) return oldSavedResources;
  //       //     return oldSavedResources.map((resource) => ({
  //       //       ...resource,
  //       //       isSaved: !resource.isSaved,
  //       //     }));
  //       //   },
  //       // );
  //       // queryClient.setQueryData(
  //       //   [...getResourcesQueryOptions().queryKey],
  //       //   (old: ResourceWithSavedStatus[] | undefined) => {
  //       //     const oldSavedResources = old?.filter((savedResource) => savedResource.id === resourceId);
  //       //     if (!oldSavedResources || oldSavedResources.length === 0) return oldSavedResources;
  //       //     return oldSavedResources.map((resource) => ({
  //       //       ...resource,
  //       //       isSaved: !resource.isSaved,
  //       //     }));
  //       //   },
  //       // );
  //       // queryClient.setQueryData(
  //       //   getResourceQueryOptions(resourceId).queryKey,
  //       //   (old: ResourceWithSavedStatus | undefined) => {
  //       //     if (!old) return old;
  //       //     return {
  //       //       ...old,
  //       //       isSaved: !old.isSaved,
  //       //     };
  //       //   },
  //       // );
  //       // Return context for rollback
  //       // return { previousResource, previousResources, previousSavedResources };
  //     },
  //     onError: (error, variables, context) => {
  //       // Rollback to previous state on error
  //       // queryClient.setQueryData(
  //       //   getSavedResourcesQueryOptions().queryKey,
  //       //   context?.previousSavedResources,
  //       // );
  //       // queryClient.setQueryData(getResourcesQueryOptions().queryKey, context?.previousResources);
  //       // queryClient.setQueryData(
  //       //   getResourceQueryOptions(variables.resourceId).queryKey,
  //       //   context?.previousResource,
  //       // );
  //     },
  //     onSuccess: (data, variables, context) => {
  //       // Invalidate both the resource and saved resources queries
  //       // queryClient.invalidateQueries({
  //       //   queryKey: getSavedResourcesQueryOptions().queryKey,
  //       // });
  //       // queryClient.invalidateQueries({
  //       //   queryKey: getResourcesQueryOptions().queryKey,
  //       // });
  //       // queryClient.invalidateQueries({
  //       //   queryKey: getResourceQueryOptions(variables.resourceId).queryKey,
  //       // });
  //       onSuccess?.(data, variables, context);
  //     },
  //     onSettled: (data, error, variables) => {
  //       // Ensure fresh data after settlement
  //       queryClient.invalidateQueries({
  //         queryKey: getSavedResourcesQueryOptions().queryKey,
  //       });
  //       queryClient.invalidateQueries({
  //         queryKey: getResourcesQueryOptions().queryKey,
  //       });
  //       queryClient.invalidateQueries({
  //         queryKey: getResourceQueryOptions(variables.resourceId).queryKey,
  //       });
  //     },
  //     ...restConfig,
  //     mutationFn: toggleSaveResource,
  //   });
};
