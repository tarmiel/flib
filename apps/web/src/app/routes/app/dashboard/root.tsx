// import { DashboardStats } from '@/components/admin/dashboard-stats';
// import { RecentActivity } from '@/components/admin/recent-activity';
// import { ResourcesOverview } from '@/components/admin/resources-overview';
import { DashboardLayout } from '@/components/layouts';
import { Outlet, useRouteError } from 'react-router';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';

export const ErrorBoundary = () => {
  const error = useRouteError();
  console.dir('Route error:', error);

  return <div>Something went wrong</div>;
};

export default function DashboardRoot() {
  return (
    <DashboardLayout>
      <NuqsAdapter>
        <Outlet />
      </NuqsAdapter>
    </DashboardLayout>
  );
}
