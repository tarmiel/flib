import { useQuery, queryOptions } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Discussion } from '@/types/api';

export const getDiscussion = ({
  discussionId,
}: {
  discussionId: Discussion['id'];
}): Promise<{ data: Discussion }> => {
  return api.get(`/discussions/${discussionId}`);
};

export const getDiscussionQueryOptions = (discussionId: Discussion['id']) => {
  return queryOptions({
    queryKey: ['discussions', discussionId],
    queryFn: () => getDiscussion({ discussionId }),
  });
};

type UseDiscussionOptions = {
  discussionId: Discussion['id'];
  queryConfig?: QueryConfig<typeof getDiscussionQueryOptions>;
};

export const useDiscussion = ({ discussionId, queryConfig }: UseDiscussionOptions) => {
  return useQuery({
    ...getDiscussionQueryOptions(discussionId),
    ...queryConfig,
  });
};
