import { Outlet, useRouteError } from 'react-router';

import { MainLayout } from '@/components/layouts';

export const ErrorBoundary = () => {
  const error = useRouteError();
  console.dir('Route error:', error);

  return <div>Something went wrong</div>;
};

const AppRoot = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default AppRoot;
