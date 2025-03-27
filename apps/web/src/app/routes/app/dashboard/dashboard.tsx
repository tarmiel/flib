import { APP_PATH } from '@/config/paths';
import { ROLES, useAuthorization } from '@/lib/authorization';
import { Navigate } from 'react-router';

export default function DashboardRoute() {
  const { role } = useAuthorization();

  // TODO: remove
  return <Navigate to={APP_PATH.app.dashboard.stats.getHref()} replace />;
  // if (role === ROLES.ADMIN) return <Navigate to={APP_PATH.app.dashboard.stats.getHref()} replace />;

  if (role === ROLES.EDITOR)
    return <Navigate to={APP_PATH.app.dashboard.resources.getHref()} replace />;

  return <Navigate to={APP_PATH.app.root.getHref()} replace />;
}
