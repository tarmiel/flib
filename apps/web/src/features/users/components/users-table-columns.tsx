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
  DropdownMenuTrigger,
} from '@/components/ui/dropdown';
import { ROLES } from '@/lib/authorization';
import type { User } from '@/types/api';
import { formatDate, formatDateIntl } from '@/utils';
import { Checkbox } from '@/components/ui/checkbox';

interface GetColumnsProps {
  setRowAction: React.Dispatch<React.SetStateAction<DataTableRowAction<User> | null>>;
}

export function getColumns({ setRowAction }: GetColumnsProps): ColumnDef<User>[] {
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
      accessorKey: 'firstName',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Ім'я" />,
      cell: ({ row }) => (
        <div>
          {row.original.firstName} {row.original.lastName}
        </div>
      ),
      enableHiding: false,
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
    },
    {
      accessorKey: 'role',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Роль" />,
      cell: ({ row }) => {
        const role = row.getValue('role') as string;
        return (
          <Badge
            variant={
              role === ROLES.ADMIN ? 'default' : role === ROLES.EDITOR ? 'secondary' : 'outline'
            }
          >
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </Badge>
        );
      },
      enableSorting: false,
      // enableHiding: false,
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Дата реєстрації" />,
      cell: ({ cell }) =>
        formatDateIntl(cell.getValue<Date>(), {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        }),
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original;

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
              <DropdownMenuItem>Переглянути</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setRowAction({ row, type: 'update' })}>
                Редагувати
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Скинути пароль</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      size: 40,
    },
  ];
}
