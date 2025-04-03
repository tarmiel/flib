import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { type QueryConfig } from '@/lib/react-query';
import { type Category } from '@/types/api';

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get(`/categories`);

  return response.data;
};

export const getCategoriesQueryOptions = () => {
  return queryOptions({
    queryKey: ['resource-categories'],
    queryFn: () => getCategories(),
  });
};

type UseCategoriesOptions = {
  queryConfig?: QueryConfig<typeof getCategoriesQueryOptions>;
};

export const useCategories = ({ queryConfig }: UseCategoriesOptions = {}) => {
  return useQuery({
    ...getCategoriesQueryOptions(),
    ...queryConfig,
    staleTime: 10 * 60 * 1000,
  });
};
