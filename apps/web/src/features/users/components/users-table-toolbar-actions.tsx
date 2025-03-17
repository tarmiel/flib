import type { Table } from '@tanstack/react-table';

import { InviteUserDialog } from '@/features/users/components/invite-user-dialog';
import type { User } from '@/types/api';

interface UsersTableToolbarActionsProps {
  table: Table<User>;
}

export function UsersTableToolbarActions({}: UsersTableToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <InviteUserDialog />

      {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
    </div>
  );
}
