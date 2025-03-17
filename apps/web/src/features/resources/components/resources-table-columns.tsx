import type { DataTableRowAction } from '@/types/data-table';
import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import * as React from 'react';
// import { toast } from "sonner";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import { ROLES } from '@/lib/authorization';
import type { Resource } from '@/types/api';
import { formatDate } from '@/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from '@/components/ui/link';
import { APP_PATH } from '@/config/paths';

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
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 10,
    },
    {
      accessorKey: 'title',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
      cell: ({ row }) => <div>{row.getValue('title')}</div>,
      enableHiding: false,
    },
    {
      accessorKey: 'authors',
      header: 'Authors',
      cell: ({ row }) => {
        const authors = row.getValue('authors') as string[];
        return <div>{authors.join(', ')}</div>;
      },
      enableSorting: false,
    },
    {
      accessorKey: 'category',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
      cell: ({ row }) => <div>{row.getValue('category')}</div>,
      filterFn: (row, id, value) => {
        return value === row.getValue(id);
      },
      enableSorting: false,
    },
    {
      accessorKey: 'type',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
      cell: ({ row }) => <div>{row.getValue('type')}</div>,
      filterFn: (row, id, value) => {
        return value === row.getValue(id);
      },
      enableSorting: false,
    },
    {
      accessorKey: 'year',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Year" />,
      cell: ({ row }) => <div>{row.getValue('year')}</div>,
      filterFn: (row, id, value) => {
        return value === row.getValue(id);
      },
    },
    {
      accessorKey: 'format',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Format" />,
      cell: ({ row }) => {
        const format = row.getValue('format') as string;
        return (
          <Badge variant="outline" className="text-xs">
            {format}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Date Added',
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
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Link
                  to={APP_PATH.app.dashboard.editResource.getHref(resource.id)}
                  className={'text-inherit'}
                >
                  Edit resource
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to={APP_PATH.app.resource.getHref(resource.id)} className={'text-inherit'}>
                  View details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => setRowAction({ row, type: 'delete' })}>
                Delete
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
