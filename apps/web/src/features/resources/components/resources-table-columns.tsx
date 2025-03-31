import type { DataTableRowAction } from '@/types/data-table';
import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/ui/data-table/data-table-column-header';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown';
import { Link } from '@/components/ui/link';
import { APP_PATH } from '@/config/paths';
import type { Resource } from '@/types/api';

interface GetColumnsProps {
  setRowAction: React.Dispatch<React.SetStateAction<DataTableRowAction<Resource> | null>>;
}

export function getColumns({ setRowAction }: GetColumnsProps): ColumnDef<Resource>[] {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5 inline-flex"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5 inline-flex"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 10,
    },
    {
      accessorKey: 'title',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Назва" />,
      cell: ({ row }) => <div className={'line-clamp-2'}>{row.getValue('title')}</div>,
      enableHiding: false,
    },
    {
      accessorKey: 'authors',
      header: 'Автори',
      cell: ({ row }) => {
        const authors = row.getValue('authors') as string[];
        return <div className={'line-clamp-2'}>{authors.join(', ')}</div>;
      },
      enableSorting: false,
    },
    {
      accessorKey: 'category',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Категорія" />,
      cell: ({ row }) => <div>{row.original.category.name}</div>,
      filterFn: (row, id, value) => {
        return value === row.getValue(id);
      },
      enableSorting: false,
    },
    {
      accessorKey: 'resourceType',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Тип" />,
      cell: ({ row }) => <div>{row.original.resourceType.name}</div>,
      filterFn: (row, id, value) => {
        return value === row.getValue(id);
      },
      enableSorting: false,
    },
    {
      accessorKey: 'publicationDate',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Дата публікації" />,
      cell: ({ row }) => {
        const date = new Date(row.original.publicationDate);
        return <div>{date.toLocaleDateString('uk-UA')}</div>;
      },
      filterFn: (row, id, value) => {
        return value === row.getValue(id);
      },
    },
    {
      accessorKey: 'fileFormat',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Формат" />,
      cell: ({ row }) => {
        const format = row.getValue('fileFormat') as string;
        return (
          <Badge variant="outline" className="text-xs">
            {format}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Дата створення',
      cell: ({ row }) => {
        const dateAdded = new Date(row.getValue('createdAt') as string);
        return <div>{dateAdded.toLocaleDateString('uk-UA')}</div>;
      },
    },
    // {
    //   accessorKey: 'createdAt',
    //   header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
    //   cell: ({ cell }) => formatDate(cell.getValue<Date>()),
    // },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const resource = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Опції</DropdownMenuLabel>
              <DropdownMenuItem>
                <Link
                  to={APP_PATH.app.dashboard.editResource.getHref(resource.id)}
                  className={'text-inherit'}
                >
                  Редагувати
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to={APP_PATH.app.resource.getHref(resource.id)} className={'text-inherit'}>
                  Переглянути
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => setRowAction({ row, type: 'delete' })}>
                Видалити
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      size: 40,
    },
  ];
}
