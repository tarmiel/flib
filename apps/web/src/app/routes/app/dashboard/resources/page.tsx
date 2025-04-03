import { MainErrorFallback } from '@/components/errors/main';
import { DataTableSkeleton } from '@/components/ui/data-table';
import { useResources } from '@/features/resources/api/get-resources';
import { ResourcesTable } from '@/features/resources/components';
import { parseResourcesFilters } from '@/features/resources/lib/resources-filter-params-parser';
import { keepPreviousData } from '@tanstack/react-query';
import { useOptimisticSearchParams } from 'nuqs/adapters/react-router/v7';
import { useMemo } from 'react';

export default function ResourcesPage() {
  const searchParams = useOptimisticSearchParams();
  const filters = useMemo(() => parseResourcesFilters(searchParams), [searchParams]);

  const resources = useResources({
    filters,
    queryConfig: {
      placeholderData: keepPreviousData,
    },
  });

  if (resources.isError) return <MainErrorFallback className={'h-full w-full'} />;
  if (resources.isPending) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Управління Ресурсами</h1>
        </div>
        <DataTableSkeleton
          columnCount={8}
          searchableColumnCount={1}
          filterableColumnCount={3}
          cellWidths={['2rem', '10rem', '6rem', '6rem', '8rem', '4rem', '6rem', '6rem']}
          shrinkZero
        />
      </div>
    );
  }

  const resourcesList = resources.data.data;
  const meta = resources.data.meta;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Управління Ресурсами</h1>
      </div>

      <ResourcesTable data={resourcesList} meta={meta} />
    </div>
  );
}
