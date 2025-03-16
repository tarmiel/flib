import { APP_PATH } from '@/config/paths';
import { DashboardStats, RecentActivity, ResourcesOverview } from '@/features/dashboard/components';
import { ROLES, useAuthorization } from '@/lib/authorization';
import { Navigate } from 'react-router';

export default function StatsRoute() {
  const { role } = useAuthorization();

  if (role === ROLES.EDITOR)
    return <Navigate to={APP_PATH.app.dashboard.resources.getHref()} replace />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <ResourcesOverview />
      </div>
    </div>
  );
}
