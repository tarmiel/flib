import { MainErrorFallback } from '@/components/errors/main';
import { DashboardLayout } from '@/components/layouts';
import { Outlet, useRouteError } from 'react-router';

export const ErrorBoundary = () => {
  const error = useRouteError();
  console.dir('Route error:', error);

  return <MainErrorFallback />;
};

export default function DashboardRoot() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
