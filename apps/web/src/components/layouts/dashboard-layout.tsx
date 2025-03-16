import { useEffect, useState } from 'react';
import { Navigate, useNavigation } from 'react-router';

import { Authorization, ROLES } from '@/lib/authorization';

import { MobileNav, NavSidebar } from '@/features/dashboard/components';
import { Header } from './header';

const Progress = () => {
  const { state, location } = useNavigation();

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
  }, [location?.pathname]);

  useEffect(() => {
    if (state === 'loading') {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(timer);
            return 100;
          }
          const newProgress = oldProgress + 10;
          return Math.min(newProgress, 100);
        });
      }, 200);

      return () => {
        clearInterval(timer);
      };
    }
  }, [state]);

  if (state !== 'loading') {
    return null;
  }

  return (
    <div
      className="fixed left-0 top-0 h-1 bg-blue-500 transition-all duration-200 ease-in-out"
      style={{ width: `${progress}%` }}
    ></div>
  );
};

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Authorization
      allowedRoles={[ROLES.ADMIN, ROLES.EDITOR]}
      forbiddenFallback={<Navigate to="/app" replace />}
    >
      <div className="min-h-screen flex flex-col bg-background">
        <Progress />
        <Header />
        <div className="flex-1 flex">
          <NavSidebar />
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
        <MobileNav />
      </div>
    </Authorization>
  );
}
