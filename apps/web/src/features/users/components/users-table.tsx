import type { DataTableFilterField, DataTableRowAction } from '@/types/data-table';
import * as React from 'react';

import { DataTable } from '@/components/ui/data-table';

import { DataTableToolbar } from '@/components/ui/data-table/data-table-toolbar';
import { useDataTable } from '@/hooks/use-data-table';

import { getColumns } from './users-table-columns';
import { ROLES } from '@/lib/authorization';
import type { User } from '@/types/api';
import { UpdateUserDialog } from '@/features/users/components/update-user-dialog';
import { UsersTableToolbarActions } from './users-table-toolbar-actions';
import { MOCK_USERS } from '../lib/users';

const pageCount = 2;

export function UsersTable() {
  // const [{ data, pageCount }, statusCounts, priorityCounts] = React.use(promises);

  const [rowAction, setRowAction] = React.useState<DataTableRowAction<User> | null>(null);

  const columns = React.useMemo(() => getColumns({ setRowAction }), []);

  const filterFields: DataTableFilterField<User>[] = [
    {
      id: 'firstName',
      label: 'Прізвище',
      placeholder: "Введіть ім'я користувача...",
    },
    {
      id: 'role',
      label: 'Роль',
      options: Object.values(ROLES).map((role) => ({
        label: role.toUpperCase(),
        value: role,
      })),
    },
  ];

  const { table } = useDataTable({
    data: MOCK_USERS,
    columns,
    pageCount,
    filterFields,
    initialState: {
      sorting: [{ id: 'createdAt', desc: true }],
      columnPinning: { right: ['actions'] },
    },
    getRowId: (originalRow) => originalRow.id as string,
    shallow: false,
    clearOnDefault: true,
  });

  return (
    <>
      <DataTable table={table}>
        <DataTableToolbar table={table} filterFields={filterFields}>
          <UsersTableToolbarActions table={table} />
        </DataTableToolbar>
      </DataTable>
      <UpdateUserDialog
        open={rowAction?.type === 'update'}
        onOpenChange={() => setRowAction(null)}
        user={rowAction?.row.original ?? null}
      />
    </>
  );
}
