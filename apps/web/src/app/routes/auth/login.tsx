import { useNavigate, useSearchParams } from 'react-router';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { APP_PATH } from '@/config/paths';
import { LoginForm } from '@/features/auth/components/login-form';
import { toast } from 'sonner';

const LoginRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <AuthLayout title="Увійдіть у свій обліковий запис">
      <LoginForm
        onSuccess={() => {
          navigate(`${redirectTo ? `${redirectTo}` : APP_PATH.app.root.getHref()}`, {
            replace: true,
          });
          toast.success('Авторизація пройшла успішно');
        }}
      />
    </AuthLayout>
  );
};

export default LoginRoute;
