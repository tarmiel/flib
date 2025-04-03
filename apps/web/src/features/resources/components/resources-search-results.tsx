import { Grid3X3, List } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Paginator } from '@/components/widgets/paginator';
import { useToggleSaveResource } from '@/features/user-resources/api/toggle-save-resource';
import type { Resource } from '@/types/api';
import { cn } from '@/utils';
import { getTotalPagesCount } from '@/utils/page';
import { keepPreviousData } from '@tanstack/react-query';
import { parseAsInteger, useQueryState } from 'nuqs';
import { useOptimisticSearchParams } from 'nuqs/adapters/react-router/v7';
import { useResources } from '../api/get-resources';
import { parseResourcesFilters } from '../lib/resources-filter-params-parser';
import { ResourceCard, ResourceCardSkeleton, type ViewMode } from './resource-card';

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE = 1;

export function ResourcesSearchResults() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(DEFAULT_PAGE));
  const searchParams = useOptimisticSearchParams();
  const filters = useMemo(() => parseResourcesFilters(searchParams), [searchParams]);

  const resourcesQuery = useResources({
    filters,
    queryConfig: {
      placeholderData: keepPreviousData,
    },
  });
  const toggleSaveResourceMutation = useToggleSaveResource();

  const handleToggleSaved = async (resourceId: Resource['id'], isSaved: boolean) => {
    toggleSaveResourceMutation.mutate({ resourceId, isSaved });
  };

  if (resourcesQuery.isLoading)
    return (
      <div className="space-y-6">
        <div className={cn('grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6')}>
          {Array(8)
            .fill(null)
            .map((_, index) => (
              <ResourceCardSkeleton key={index} />
            ))}
        </div>
      </div>
    );

  const resources = resourcesQuery.data;
  if (!resources) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          Результат пошуку ({resourcesQuery.data?.meta.total ?? 0})
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            className="h-8 w-8"
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="h-4 w-4" />
            <span className="sr-only">Grid view</span>
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            className="h-8 w-8"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
            <span className="sr-only">List view</span>
          </Button>
        </div>
      </div>

      <div
        className={cn(
          viewMode === 'list'
            ? 'space-y-4'
            : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6',
        )}
      >
        {resources.data?.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            viewMode={viewMode}
            onToggleSaved={() => handleToggleSaved(resource.id, resource.isSaved)}
            className={cn({
              // 'opacity-70 animate-pulse': resourcesQuery.isFetching,
            })}
            isSaved={resource.isSaved}
          />
        ))}
      </div>

      <Paginator
        currentPage={page}
        totalPages={getTotalPagesCount(
          resourcesQuery.data?.meta.total,
          resourcesQuery.data?.meta.pageSize ?? DEFAULT_PAGE_SIZE,
        )}
        onPageChange={(pageNumber) => {
          setPage(pageNumber);
        }}
        showPreviousNext
      />
    </div>
  );
}
