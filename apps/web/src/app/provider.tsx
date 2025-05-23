import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';

import { MainErrorFallback } from '@/components/errors/main';
import { Notifications } from '@/components/ui/notifications';
import { Spinner } from '@/components/ui/spinner';
import { AuthLoader } from '@/lib/auth';
import { queryConfig } from '@/lib/react-query';
import { Toaster } from '@/components/ui/toast';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';
import { BookLoader } from '@/components/ui/loader';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig,
      }),
  );

  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <Spinner size="xl" />
        </div>
      }
    >
      <ErrorBoundary
        FallbackComponent={() => <MainErrorFallback />}
        onError={(error) => console.log('Custom error', error)}
      >
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <NuqsAdapter>
              {import.meta.env.DEV && <ReactQueryDevtools />}
              <Notifications />
              <AuthLoader
                renderLoading={() => (
                  <div className="flex h-screen w-screen items-center justify-center">
                    <BookLoader />
                  </div>
                )}
                renderError={() => <MainErrorFallback />}
              >
                {children}
              </AuthLoader>
              <Toaster />
            </NuqsAdapter>
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
