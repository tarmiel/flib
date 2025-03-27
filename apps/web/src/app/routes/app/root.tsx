import { Outlet, useRouteError } from 'react-router';

import { MainLayout } from '@/components/layouts';
import { MainErrorFallback } from '@/components/errors/main';

export const ErrorBoundary = () => {
  const error = useRouteError();
  console.dir('Route error:', error);

  return <MainErrorFallback />;
};

const AppRoot = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default AppRoot;
