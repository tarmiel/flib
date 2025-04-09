import { useNavigate, useSearchParams } from 'react-router';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { APP_PATH } from '@/config/paths';
import { RegisterForm } from '@/features/auth/components/register-form';
import { toast } from 'sonner';

const RegisterRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <AuthLayout title="Створіть аккаунт">
      <RegisterForm
        onSuccess={() => {
          navigate(`${APP_PATH.auth.login.getHref(redirectTo)}`, {
            replace: true,
          });
          toast.success('Реєстрація пройшла успішно. Будь ласка, авторизуйтеся');
        }}
      />
    </AuthLayout>
  );
};

export default RegisterRoute;
