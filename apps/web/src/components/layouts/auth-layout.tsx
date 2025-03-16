import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import logo from '@/assets/logo.svg';
import { Head } from '@/components/seo';
import { Link } from '@/components/ui/link';
import { APP_PATH } from '@/config/paths';
import { useUser } from '@/lib/auth';
import { BookOpen } from 'lucide-react';

type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const AuthLayout = ({ children, title }: LayoutProps) => {
  const user = useUser();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  const navigate = useNavigate();

  useEffect(() => {
    if (user.data) {
      navigate(redirectTo ? redirectTo : APP_PATH.app.root.getHref(), {
        replace: true,
      });
    }
  }, [user.data, navigate, redirectTo]);

  return (
    <>
      <Head title={title} />
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <Link
            className="flex items-center gap-2 self-center text-3xl tracking-widest font-medium text-primary"
            to={APP_PATH.home.getHref()}
          >
            <div className="flex size-8 items-center justify-center rounded-md">
              <BookOpen className="size-8" />
            </div>
            LibHub
          </Link>
          {children}
        </div>
      </div>
    </>
  );
};
