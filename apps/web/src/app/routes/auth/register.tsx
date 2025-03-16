import { useNavigate, useSearchParams } from 'react-router';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { APP_PATH } from '@/config/paths';
import { RegisterForm } from '@/features/auth/components/register-form';

const RegisterRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <AuthLayout title="Register your account">
      <RegisterForm
        onSuccess={() => {
          navigate(`${redirectTo ? `${redirectTo}` : APP_PATH.app.root.getHref()}`, {
            replace: true,
          });
        }}
      />
    </AuthLayout>
  );
};

export default RegisterRoute;
