import { api } from '@/lib/api-client';
import type { QueryConfig } from '@/lib/react-query';
import { queryOptions, useQuery } from '@tanstack/react-query';

const getFileUrl = async ({ fileId }: { fileId: string }): Promise<string> => {
  const response = await api.get(`/files-upload/${fileId}`);

  return response.data;
};

export const getFileUrlQueryOptions = (fileId: string) => {
  return queryOptions({
    queryKey: ['files', fileId],
    queryFn: () => getFileUrl({ fileId }),
  });
};

type UseFileUrlOptions = {
  fileId: string;
  queryConfig?: QueryConfig<typeof getFileUrlQueryOptions>;
};

export const useFileUrl = ({ fileId, queryConfig }: UseFileUrlOptions) => {
  return useQuery({
    ...getFileUrlQueryOptions(fileId),
    ...queryConfig,
    staleTime: 60 * 1000,
  });
};
