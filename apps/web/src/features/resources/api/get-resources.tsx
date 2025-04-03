import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { type QueryConfig } from '@/lib/react-query';
import {
  type Meta,
  type Paginated,
  type Resource,
  type ResourceWithSavedStatus,
} from '@/types/api';

export type ResourcesFilterParams = Partial<
  Pick<Meta, 'page' | 'pageSize'> & {
    q: string;
    title: string;
    sort: string;
    category: string[];
    resourceType: string[];
    fileFormat: string[];
    yearFrom: number;
    yearTo: number;
  }
>;

const sanitizeFilterParams = (
  params: ResourcesFilterParams = {},
): Partial<ResourcesFilterParams> => {
  const { category = [], resourceType = [], fileFormat = [], ...filters } = params;
  const prepared: Record<string, unknown> = { ...filters };

  if (category.length > 0) {
    prepared.category = category.join(',');
  }

  if (resourceType.length > 0) {
    prepared.resourceType = resourceType.join(',');
  }

  if (fileFormat.length > 0) {
    prepared.fileFormat = fileFormat.join(',');
  }

  return prepared;
};

export const getResources = async (
  filters: ResourcesFilterParams = {},
): Promise<Paginated<ResourceWithSavedStatus>> => {
  const filterParams = sanitizeFilterParams(filters);

  const response = await api.get(`/resources`, {
    params: filterParams,
  });

  return response.data;
};

export const resourcesQueryKeys = {
  base: ['resources'] as const,
  list: (filters: ResourcesFilterParams) =>
    [...resourcesQueryKeys.base, sanitizeFilterParams(filters)] as const,
};

export const getResourcesQueryOptions = (filters: ResourcesFilterParams = {}) => {
  return queryOptions({
    queryKey: resourcesQueryKeys.list(filters),
    queryFn: () => getResources(filters),
  });
};

type UseResourcesOptions = {
  queryConfig?: QueryConfig<typeof getResourcesQueryOptions>;
  filters?: ResourcesFilterParams;
};

export const useResources = ({ queryConfig = {}, filters = {} }: UseResourcesOptions = {}) => {
  return useQuery({
    ...getResourcesQueryOptions(filters),
    ...queryConfig,
  });
};
