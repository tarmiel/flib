import { UsersTable } from '@/features/users/components/users-table';

import { MainErrorFallback } from '@/components/errors/main';
import { DataTableSkeleton } from '@/components/ui/data-table';
import { useUsers } from '@/features/users/api/get-users';
import { useOptimisticSearchParams } from 'nuqs/adapters/react-router/v7';
import { parseUsersFilters } from '@/features/users/lib/users-filter-params-parser';
import { useMemo } from 'react';
import { keepPreviousData } from '@tanstack/react-query';

export default function UsersPage() {
  const searchParams = useOptimisticSearchParams();
  const filters = useMemo(() => parseUsersFilters(searchParams), [searchParams]);

  const users = useUsers({
    filters,
    queryConfig: {
      placeholderData: keepPreviousData,
    },
  });

  if (users.isError) return <MainErrorFallback className={'h-full w-full'} />;
  if (users.isPending) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Управління користувачами</h1>
        </div>
        <DataTableSkeleton
          columnCount={5}
          searchableColumnCount={1}
          filterableColumnCount={1}
          cellWidths={['2rem', '15rem', '10rem', '10rem', '10rem']}
          shrinkZero
        />
      </div>
    );
  }

  const usersList = users.data.data;
  const meta = users.data.meta;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Управління користувачами</h1>
      </div>

      <UsersTable data={usersList} meta={meta} />
    </div>
  );
}
