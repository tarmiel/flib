import type { DataTableFilterField, DataTableRowAction } from '@/types/data-table';
import * as React from 'react';

import { DataTable } from '@/components/ui/data-table';

import { DataTableToolbar } from '@/components/ui/data-table/data-table-toolbar';
import { useDataTable } from '@/hooks/use-data-table';
import { toSentenceCase } from '@/utils';

// import { DeleteTasksDialog } from './delete-tasks-dialog';
// import { useFeatureFlags } from './feature-flags-provider';
import { getColumns } from './users-table-columns';
// import { TasksTableFloatingBar } from './tasks-table-floating-bar';
// import { TasksTableToolbarActions } from './tasks-table-toolbar-actions';
// import { UpdateTaskSheet } from './update-task-sheet';
import { ROLES } from '@/lib/authorization';
import type { User } from '@/types/api';
import { UpdateUserDialog } from '@/features/users/components/update-user-dialog';
import { UsersTableToolbarActions } from './users-table-toolbar-actions';

// interface UsersTableProps {
//   promises: Promise<
//     [
//       Awaited<ReturnType<typeof getUsers>>,
//       Awaited<ReturnType<typeof getUserStatusCounts>>,
//       Awaited<ReturnType<typeof getUserPriorityCounts>>,
//     ]
//   >;
// }
const data: User[] = [
  {
    id: 'u1',
    lastName: 'John Smith',
    firstName: 'John Smith',
    email: 'john.smith@university.edu',
    role: 'ADMIN',
    createdAt: '2022-01-10T09:00:00',
  },
  {
    id: 'u2',
    lastName: 'Sarah Johnson',
    firstName: 'Sarah Johnson',
    email: 'sarah.j@university.edu',
    role: 'EDITOR',
    createdAt: '2022-03-22T14:30:00',
  },
  {
    id: 'u3',
    lastName: 'Michael Chen',
    firstName: 'Michael Chen',
    email: 'm.chen@university.edu',
    role: 'EDITOR',
    createdAt: '2022-05-05T11:20:00',
  },
  {
    id: 'u4',
    lastName: 'Emily Rodriguez',
    firstName: 'Emily Rodriguez',
    email: 'e.rodriguez@university.edu',
    role: 'USER',
    createdAt: '2022-06-18T10:10:00',
  },
  {
    id: 'u5',
    lastName: 'David Kim',
    firstName: 'David Kim',
    email: 'd.kim@university.edu',
    role: 'USER',
    createdAt: '2022-08-30T15:45:00',
  },
  {
    id: 'u6',
    lastName: 'Lisa Wang',
    firstName: 'Lisa Wang',
    email: 'l.wang@university.edu',
    role: 'EDITOR',
    createdAt: '2022-09-12T09:30:00',
  },
  {
    id: 'u7',
    lastName: 'Robert Taylor',
    firstName: 'Robert Taylor',
    email: 'r.taylor@university.edu',
    role: 'USER',
    createdAt: '2022-10-05T14:15:00',
  },
  {
    id: 'u8',
    lastName: 'Jennifer Lee',
    firstName: 'Jennifer Lee',
    email: 'j.lee@university.edu',
    role: 'USER',
    createdAt: '2022-11-20T10:50:00',
  },
  {
    id: 'u9',
    lastName: 'Carlos Gomez',
    firstName: 'Carlos Gomez',
    email: 'c.gomez@university.edu',
    role: 'USER',
    createdAt: '2023-01-15T13:20:00',
  },
  {
    id: 'u10',
    lastName: 'Michelle Park',
    firstName: 'Michelle Park',
    email: 'm.park@university.edu',
    role: 'USER',
    createdAt: '2023-02-28T11:10:00',
  },
  {
    id: 'u11',
    lastName: 'Thomas Wilson',
    firstName: 'Thomas Wilson',
    email: 't.wilson@university.edu',
    role: 'USER',
    createdAt: '2023-03-17T09:40:00',
  },
  {
    id: 'u12',
    lastName: 'Sophia Martinez',
    firstName: 'Sophia Martinez',
    email: 's.martinez@university.edu',
    role: 'USER',
    createdAt: '2023-04-22T15:30:00',
  },
];

const pageCount = 2;

export function UsersTable() {
  // const [{ data, pageCount }, statusCounts, priorityCounts] = React.use(promises);

  const [rowAction, setRowAction] = React.useState<DataTableRowAction<User> | null>(null);

  const columns = React.useMemo(() => getColumns({ setRowAction }), []);

  const filterFields: DataTableFilterField<User>[] = [
    {
      id: 'lastName',
      label: 'Last Name',
      placeholder: 'Search users...',
    },
    {
      id: 'role',
      label: 'Role',
      options: Object.keys(ROLES).map((role) => ({
        label: role,
        value: role,
      })),
    },
  ];

  const { table } = useDataTable({
    data,
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
