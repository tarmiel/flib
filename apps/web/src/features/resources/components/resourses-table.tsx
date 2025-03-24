import type { DataTableFilterField, DataTableRowAction } from '@/types/data-table';
import * as React from 'react';

import { DataTable, DataTableToolbar } from '@/components/ui/data-table';

import { useDataTable } from '@/hooks/use-data-table';

import { getColumns } from './resources-table-columns';

import type { Resource } from '@/types/api';
// import { DeleteResourceDialog } from '@/features/resources/components/delete-resource-dialog';
import { ResourcesTableToolbarActions } from './resources-table-toolbar-actions';
import { RESOURCE_CATEGORIES, RESOURCE_FILE_FORMATS, RESOURCE_TYPES } from '../lib/resources';
import { toSentenceCase } from '@/utils';
import { DeleteResourcesDialog } from './delete-resources-dialog';

// Sample data
const data: Resource[] = [
  {
    id: '1',
    title: 'Introduction to Algorithms',
    authors: ['Thomas H. Cormen', 'Charles E. Leiserson', 'Ronald L. Rivest', 'Clifford Stein'],
    category: 'Computer Science',
    type: 'Book',
    year: 2009,
    format: 'PDF',
    addedBy: 'John Smith',
    createdAt: '2022-05-15T10:30:00',
  },
  {
    id: '2',
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    authors: ['Robert C. Martin'],
    category: 'Computer Science',
    type: 'Book',
    year: 2008,
    format: 'PDF',
    addedBy: 'Sarah Johnson',
    createdAt: '2022-06-22T14:45:00',
  },
  {
    id: '3',
    title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
    authors: ['Erich Gamma', 'Richard Helm', 'Ralph Johnson', 'John Vlissides'],
    category: 'Computer Science',
    type: 'Book',
    year: 1994,
    format: 'PDF',
    addedBy: 'Michael Chen',
    createdAt: '2022-07-10T09:15:00',
  },
  {
    id: '4',
    title: 'Artificial Intelligence: A Modern Approach',
    authors: ['Stuart Russell', 'Peter Norvig'],
    category: 'Computer Science',
    type: 'Book',
    year: 2020,
    format: 'PDF',
    addedBy: 'Emily Rodriguez',
    createdAt: '2022-08-05T11:20:00',
  },
  {
    id: '5',
    title: 'The Pragmatic Programmer',
    authors: ['Andrew Hunt', 'David Thomas'],
    category: 'Computer Science',
    type: 'Book',
    year: 2019,
    format: 'PDF',
    addedBy: 'David Kim',
    createdAt: '2022-09-18T16:30:00',
  },
  {
    id: '6',
    title: 'Compilers: Principles, Techniques, and Tools',
    authors: ['Alfred V. Aho', 'Monica S. Lam', 'Ravi Sethi', 'Jeffrey D. Ullman'],
    category: 'Computer Science',
    type: 'Book',
    year: 2006,
    format: 'PDF',
    addedBy: 'Lisa Wang',
    createdAt: '2022-10-12T13:40:00',
  },
  {
    id: '7',
    title: 'Machine Learning: A Probabilistic Perspective',
    authors: ['Kevin P. Murphy'],
    category: 'Computer Science',
    type: 'Book',
    year: 2012,
    format: 'PDF',
    addedBy: 'Robert Taylor',
    createdAt: '2022-11-25T10:10:00',
  },
  {
    id: '8',
    title: 'Deep Learning',
    authors: ['Ian Goodfellow', 'Yoshua Bengio', 'Aaron Courville'],
    category: 'Computer Science',
    type: 'Book',
    year: 2016,
    format: 'PDF',
    addedBy: 'Jennifer Lee',
    createdAt: '2022-12-15T14:20:00',
  },
  {
    id: '9',
    title: 'Computer Networks',
    authors: ['Andrew S. Tanenbaum', 'David J. Wetherall'],
    category: 'Computer Science',
    type: 'Book',
    year: 2010,
    format: 'PDF',
    addedBy: 'Carlos Gomez',
    createdAt: '2023-01-20T09:30:00',
  },
  {
    id: '10',
    title: 'Operating System Concepts',
    authors: ['Abraham Silberschatz', 'Peter B. Galvin', 'Greg Gagne'],
    category: 'Computer Science',
    type: 'Book',
    year: 2018,
    format: 'PDF',
    addedBy: 'Michelle Park',
    createdAt: '2023-02-10T11:45:00',
  },
  {
    id: '11',
    title: 'Database System Concepts',
    authors: ['Abraham Silberschatz', 'Henry F. Korth', 'S. Sudarshan'],
    category: 'Computer Science',
    type: 'Book',
    year: 2019,
    format: 'PDF',
    addedBy: 'Thomas Wilson',
    createdAt: '2023-03-05T15:50:00',
  },
  {
    id: '12',
    title: 'Computer Organization and Design',
    authors: ['David A. Patterson', 'John L. Hennessy'],
    category: 'Computer Science',
    type: 'Book',
    year: 2017,
    format: 'PDF',
    addedBy: 'Sophia Martinez',
    createdAt: '2023-04-12T10:25:00',
  },
];

const pageCount = 2;

export function ResourcesTable() {
  // const [{ data, pageCount }, statusCounts, priorityCounts] = React.use(promises);

  const [rowAction, setRowAction] = React.useState<DataTableRowAction<Resource> | null>(null);

  const columns = React.useMemo(() => getColumns({ setRowAction }), []);

  const filterFields: DataTableFilterField<Resource>[] = [
    {
      id: 'title',
      label: 'Titlef',
      placeholder: 'Search resources...',
    },
    {
      id: 'type',
      label: 'Type',
      options: RESOURCE_TYPES.map((type) => ({
        label: toSentenceCase(type),
        value: type,
      })),
    },
    {
      id: 'category',
      label: 'Category',
      options: RESOURCE_CATEGORIES.map((category) => ({
        label: toSentenceCase(category),
        value: category,
      })),
    },
    {
      id: 'format',
      label: 'Format',
      options: RESOURCE_FILE_FORMATS.map((format) => ({
        label: format,
        value: format,
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
