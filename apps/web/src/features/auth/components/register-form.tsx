import { Link, useSearchParams } from 'react-router';

import googleLogo from '@/assets/google-logo.svg';

import { Button } from '@/components/ui/button';
import { Form, Input } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { APP_PATH } from '@/config/paths';
import { useRegister, registerInputSchema } from '@/lib/auth';
import { cn } from '@/utils';

type RegisterFormProps = {
  onSuccess: () => void;
  className?: string;
};

export const RegisterForm = ({ onSuccess, className, ...props }: RegisterFormProps) => {
  const registering = useRegister({ onSuccess });
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Створіть свій обліковий запис</CardTitle>
          <CardDescription>
            Введіть свої дані нижче, щоб створити новий обліковий запис
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form
            onSubmit={(values) => {
              registering.mutate(values);
            }}
            schema={registerInputSchema}
            options={{
              shouldUnregister: true,
            }}
          >
            {({ register, formState }) => (
              <>
                <Input
                  type="text"
                  label="Ім'я"
                  placeholder="Ім'я"
                  error={formState.errors['firstName']}
                  registration={register('firstName')}
                />
                <Input
                  type="text"
                  label="Прізвище"
                  placeholder="Прізвище"
                  error={formState.errors['lastName']}
                  registration={register('lastName')}
                />
                <Input
                  type="email"
                  label="Електронна адреса"
                  placeholder="m@example.com"
                  error={formState.errors['email']}
                  registration={register('email')}
                />
                <Input
                  type="password"
                  label="Пароль"
                  placeholder="Пароль"
                  error={formState.errors['password']}
                  registration={register('password')}
                />

                <div>
                  <Button isLoading={registering.isPending} type="submit" className="w-full">
                    Зареєструватись
                  </Button>
                </div>
              </>
            )}
          </Form>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">Або</span>
          </div>
          <Button
            variant="outline"
            className="w-full"
            icon={<img src={googleLogo} alt="Логотип Google" className="size-4" />}
          >
            Продовжити з Google
          </Button>
          <div className="text-center text-sm">
            Вже маєте обліковий запис?{' '}
            <Link
              to={APP_PATH.auth.login.getHref(redirectTo)}
              className="underline underline-offset-4"
            >
              Увійти
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        Натискаючи кнопку, ви погоджуєтесь з нашими <a href="#">Умовами користування</a> та{' '}
        <a href="#">Політикою конфіденційності</a>.
      </div>
    </div>
  );
};
