import { Grid3X3, List } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Paginator } from '@/components/widgets/paginator';
import { ResourceCard, type ViewMode } from './resource-card';
import { parseAsInteger, useQueryState } from 'nuqs';
import type { Resource } from '@/types/api';
import { MOCK_RESOURCES } from '../lib/resources';

export function ResourcesSearchResults() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Результат пошуку</h2>
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

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {MOCK_RESOURCES.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} viewMode={'grid'} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {MOCK_RESOURCES.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} viewMode={'list'} />
          ))}
        </div>
      )}

      <Paginator
        currentPage={page}
        totalPages={12}
        onPageChange={(pageNumber) => {
          setPage(pageNumber);
        }}
        showPreviousNext
      />
    </div>
  );
}
