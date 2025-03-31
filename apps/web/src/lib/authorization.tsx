import * as React from 'react';

import { Comment, User, type UserRole } from '@/types/api';

import { useUser } from './auth';
import type { ValueOf } from '@/types/utils';

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  EDITOR: 'editor',
} as const satisfies Record<string, UserRole>;

type RoleTypes = ValueOf<typeof ROLES>;

export const POLICIES = {
  'comment:delete': (user: User, comment: Comment) => {
    if (user.role === ROLES.ADMIN) {
      return true;
    }

    if (user.role === ROLES.USER && comment.author?.id === user.id) {
      return true;
    }

    return false;
  },
};

export const useAuthorization = () => {
  const user = useUser();

  const checkAccess = React.useCallback(
    ({ allowedRoles }: { allowedRoles: RoleTypes[] }) => {
      if (user.data && allowedRoles?.length > 0) {
        return allowedRoles.includes(user.data.role);
      }

      return false;
    },
    [user.data],
  );

  return { checkAccess, role: user.data?.role ?? ROLES.USER };
};

type AuthorizationProps = {
  forbiddenFallback?: React.ReactNode;
  children: React.ReactNode;
} & (
  | {
      allowedRoles: RoleTypes[];
      policyCheck?: never;
    }
  | {
      allowedRoles?: never;
      policyCheck: boolean;
    }
);

export const Authorization = ({
  policyCheck,
  allowedRoles,
  forbiddenFallback = null,
  children,
}: AuthorizationProps) => {
  const { checkAccess } = useAuthorization();

  let canAccess = false;

  if (allowedRoles) {
    canAccess = checkAccess({ allowedRoles });
  }

  if (typeof policyCheck !== 'undefined') {
    canAccess = policyCheck;
  }

  return <>{canAccess ? children : forbiddenFallback}</>;
};
