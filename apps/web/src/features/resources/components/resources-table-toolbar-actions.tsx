import type { Table } from '@tanstack/react-table';

import type { Resource } from '@/types/api';
import { Link } from '@/components/ui/link';
import { APP_PATH } from '@/config/paths';
import { Plus } from 'lucide-react';
import { cn } from '@/utils';
import { buttonVariants } from '@/components/ui/button';
import { DeleteResourcesDialog } from './delete-resources-dialog';

interface ResourcesTableToolbarActionsProps {
  table: Table<Resource>;
}

export function ResourcesTableToolbarActions({ table }: ResourcesTableToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeleteResourcesDialog
          resources={table.getFilteredSelectedRowModel().rows.map((row) => row.original)}
          onSuccess={() => table.toggleAllRowsSelected(false)}
        />
      ) : null}

      <Link
        to={APP_PATH.app.dashboard.uploadResource.getHref()}
        className={cn(buttonVariants(), 'hover:text-secondary h-8')}
      >
        <Plus className="mr-2 h-4 w-4" /> Add Resource
      </Link>

      {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
    </div>
  );
}
