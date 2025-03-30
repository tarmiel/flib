import type { DataTableFilterField, DataTableRowAction } from '@/types/data-table';
import * as React from 'react';

import { DataTable, DataTableToolbar } from '@/components/ui/data-table';

import { useDataTable } from '@/hooks/use-data-table';

import { getColumns } from './resources-table-columns';

import type { Resource } from '@/types/api';
// import { DeleteResourceDialog } from '@/features/resources/components/delete-resource-dialog';
import { ResourcesTableToolbarActions } from './resources-table-toolbar-actions';
import {
  MOCK_RESOURCES,
  RESOURCE_CATEGORIES,
  RESOURCE_FILE_FORMATS,
  RESOURCE_TYPES,
} from '../lib/resources';
import { toSentenceCase } from '@/utils';
import { DeleteResourcesDialog } from './delete-resources-dialog';

const pageCount = 2;

export function ResourcesTable() {
  // const [{ data, pageCount }, statusCounts, priorityCounts] = React.use(promises);

  const [rowAction, setRowAction] = React.useState<DataTableRowAction<Resource> | null>(null);

  const columns = React.useMemo(() => getColumns({ setRowAction }), []);

  const filterFields: DataTableFilterField<Resource>[] = [
    {
      id: 'title',
      label: 'Назва',
      placeholder: 'Пошук ресурсів...',
    },
    {
      id: 'resourceType',
      label: 'Тип',
      options: RESOURCE_TYPES.map((type) => ({
        label: type,
        value: type,
      })),
    },
    {
      id: 'category',
      label: 'Категорія',
      options: RESOURCE_CATEGORIES.map((category) => ({
        label: category,
        value: category,
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

  const { table } = useDataTable({
    data: MOCK_RESOURCES.slice(0, 6),
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
