import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import { APP_PATH } from '@/config/paths';
import { ProtectedRoute } from '@/lib/auth';

import { default as AppRoot, ErrorBoundary as AppRootErrorBoundary } from './routes/app/root';
import {
  default as DashboardRoot,
  ErrorBoundary as DashboardRootErrorBoundary,
} from './routes/app/dashboard/root';

const convert = (queryClient: QueryClient) => (m: any) => {
  const { clientLoader, clientAction, default: Component, ...rest } = m;
  return {
    ...rest,
    loader: clientLoader?.(queryClient),
    action: clientAction?.(queryClient),
    Component,
  };
};

export const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: APP_PATH.home.path,
      lazy: () => import('./routes/landing').then(convert(queryClient)),
    },
    {
      path: APP_PATH.auth.register.path,
      lazy: () => import('./routes/auth/register').then(convert(queryClient)),
    },
    {
      path: APP_PATH.auth.login.path,
      lazy: () => import('./routes/auth/login').then(convert(queryClient)),
    },
    {
      path: APP_PATH.app.root.path,
      element: (
        <ProtectedRoute>
          <AppRoot />
        </ProtectedRoute>
      ),
      ErrorBoundary: AppRootErrorBoundary,
      children: [
        {
          path: APP_PATH.app.profile.path,
          lazy: () => import('./routes/app/profile').then(convert(queryClient)),
        },
        {
          path: APP_PATH.app.resources.path,
          lazy: () => import('./routes/app/resources/resources').then(convert(queryClient)),
        },
        {
          path: APP_PATH.app.resource.path,
          lazy: () => import('./routes/app/resources/resource').then(convert(queryClient)),
        },
        {
          path: APP_PATH.app.savedResources.path,
          lazy: () => import('./routes/app/resources/saved-resources').then(convert(queryClient)),
        },
        {
          path: APP_PATH.app.discussions.path,
          lazy: () => import('./routes/app/discussions/discussions').then(convert(queryClient)),
        },
        {
          path: APP_PATH.app.discussion.path,
          lazy: () => import('./routes/app/discussions/discussion').then(convert(queryClient)),
        },
        {
          path: APP_PATH.app.users.path,
          lazy: () => import('./routes/app/users').then(convert(queryClient)),
        },
      ],
    },
    {
      path: APP_PATH.app.dashboard.root.path,
      element: (
        <ProtectedRoute>
          <DashboardRoot />
        </ProtectedRoute>
      ),
      ErrorBoundary: DashboardRootErrorBoundary,
      children: [
        {
          index: true,
          lazy: () => import('./routes/app/dashboard/stats').then(convert(queryClient)),
        },
        {
          path: APP_PATH.app.dashboard.users.getHref(),
          lazy: () => import('./routes/app/dashboard/users/page').then(convert(queryClient)),
        },
      ],
    },
    {
      path: '*',
      lazy: () => import('./routes/not-found').then(convert(queryClient)),
    },
  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
};
