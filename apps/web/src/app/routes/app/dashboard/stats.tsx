import { DashboardStats, RecentActivity, ResourcesOverview } from '@/features/dashboard/components';
import { Authorization, ROLES } from '@/lib/authorization';

export default function StatsRoute() {
  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Адміністратор</h1>
        </div>

        <DashboardStats />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivity />
          <ResourcesOverview />
        </div>
      </div>
    </Authorization>
  );
}
