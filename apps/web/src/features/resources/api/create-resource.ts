import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Resource, type Category, type ResourceType } from '@/types/api';

import { getResourcesQueryOptions } from './get-resources';
import { convertCamelToSnakeCase } from '@/utils';

export type CreateResourceInput = {
  title: string;
  description?: string;
  categoryId: Category['id'];
  resourceTypeId: ResourceType['id'];
  publicationDate: string;
  citation?: string;
  authors: string[];
  keywords: string[];
  additionalInfo?: Record<string, unknown> | null;
  fileName: string;
  fileFormat: string;
  fileSize: string;
  previewImageName?: string | null;
};

export const createResource = ({ data }: { data: CreateResourceInput }): Promise<Resource> => {
  return api.post(`/resources`, convertCamelToSnakeCase(data));
};

type UseCreateResourceOptions = {
  mutationConfig?: MutationConfig<typeof createResource>;
};

export const useCreateResource = ({ mutationConfig }: UseCreateResourceOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getResourcesQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createResource,
  });
};
