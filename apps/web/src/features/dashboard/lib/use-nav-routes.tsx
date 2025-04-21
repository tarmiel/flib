import { APP_PATH } from '@/config/paths';
import { ROLES, useAuthorization } from '@/lib/authorization';
import { BarChart3, BookOpen, FileUp, Users, type LucideProps } from 'lucide-react';
import { useMemo } from 'react';

type NavigationItem = {
  name: string;
  path: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
};

export const useNavRoutes = () => {
  const { checkAccess } = useAuthorization();
  const navRoutes = useMemo(() => {
    return [
      checkAccess({ allowedRoles: [ROLES.ADMIN, ROLES.EDITOR] }) && {
        name: 'Додати ресурс',
        path: APP_PATH.app.dashboard.uploadResource.getHref(),
        Icon: FileUp,
      },
      checkAccess({ allowedRoles: [ROLES.EDITOR] }) && {
        name: 'Мої ресурси',
        path: APP_PATH.app.dashboard.resources.getHref(),
        Icon: BookOpen,
      },
      ...(checkAccess({ allowedRoles: [ROLES.ADMIN] })
        ? [
            {
              name: 'Ресурси',
              path: APP_PATH.app.dashboard.resources.getHref(),
              Icon: BookOpen,
            },
            {
              name: 'Користувачі',
              path: APP_PATH.app.dashboard.users.getHref(),
              Icon: Users,
            },
          ]
        : []),
    ].filter(Boolean) as NavigationItem[];
  }, [checkAccess]);

  return navRoutes;
};
