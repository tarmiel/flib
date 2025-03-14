import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getInfiniteCommentsQueryOptions } from './get-comments';
import type { Comment, Discussion } from '@/types/api';

export const deleteComment = ({ commentId }: { commentId: Comment['id'] }) => {
  return api.delete(`/comments/${commentId}`);
};

type UseDeleteCommentOptions = {
  discussionId: Discussion['id'];
  mutationConfig?: MutationConfig<typeof deleteComment>;
};

export const useDeleteComment = ({ mutationConfig, discussionId }: UseDeleteCommentOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getInfiniteCommentsQueryOptions(discussionId).queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteComment,
  });
};
