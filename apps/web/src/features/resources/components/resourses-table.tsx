import type { DataTableFilterField, DataTableRowAction } from '@/types/data-table';
import * as React from 'react';

import { DataTable, DataTableToolbar } from '@/components/ui/data-table';

import { useDataTable } from '@/hooks/use-data-table';

import { getColumns } from './resources-table-columns';

import { useCategories } from '@/features/resource-categories/api/get-resource-categories';
import { useResourceTypes } from '@/features/resource-types/api/get-resource-types';
import type { Meta, Resource, User } from '@/types/api';
import { RESOURCE_FILE_FORMATS } from '../lib/resources';
import { DeleteResourcesDialog } from './delete-resources-dialog';
import { ResourcesTableToolbarActions } from './resources-table-toolbar-actions';
import { useUser } from '@/lib/auth';

interface ResourcesTableProps {
  data: Resource[];
  meta: Meta;
}

export function ResourcesTable({ data = [], meta }: ResourcesTableProps) {
  const { data: categories = [] } = useCategories();
  const { data: resourceTypes = [] } = useResourceTypes();
  const { data: user } = useUser();

  const [rowAction, setRowAction] = React.useState<DataTableRowAction<Resource> | null>(null);

  const columns = React.useMemo(() => getColumns({ setRowAction, user: user as User }), [user]);

  const filterFields: DataTableFilterField<Resource>[] = [
    {
      id: 'title',
      label: 'Назва',
      placeholder: 'Пошук ресурсів...',
    },
    {
      id: 'resourceType',
      label: 'Тип',
      options: resourceTypes.map((type) => ({
        label: type.name,
        value: type.name,
      })),
    },
    {
      id: 'category',
      label: 'Категорія',
      options: categories.map((category) => ({
        label: category.name,
        value: category.name,
      })),
    },
    {
      id: 'fileFormat',
      label: 'Формат',
      options: RESOURCE_FILE_FORMATS.map((format) => ({
        label: format,
        value: format,
      })),
    },
  ];

  const pageCount = Math.ceil(meta.total / meta.pageSize);

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
          <ResourcesTableToolbarActions table={table} />
        </DataTableToolbar>
      </DataTable>
      <DeleteResourcesDialog
        open={rowAction?.type === 'delete'}
        onOpenChange={() => setRowAction(null)}
        resources={rowAction?.row.original ? [rowAction?.row.original] : []}
        showTrigger={false}
        onSuccess={() => rowAction?.row.toggleSelected(false)}
      />
    </>
  );
}
