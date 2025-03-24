import { Outlet, useRouteError } from 'react-router';

import { MainLayout } from '@/components/layouts';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';

export const ErrorBoundary = () => {
  const error = useRouteError();
  console.dir('Route error:', error);

  return <div>Something went wrong</div>;
};

const AppRoot = () => {
  return (
    <MainLayout>
      <NuqsAdapter>
        <Outlet />
      </NuqsAdapter>
    </MainLayout>
  );
};

export default AppRoot;
