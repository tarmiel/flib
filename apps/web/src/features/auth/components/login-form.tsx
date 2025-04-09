import { Link, useSearchParams } from 'react-router';

import googleLogo from '@/assets/google-logo.svg';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, Input } from '@/components/ui/form';

import { APP_PATH } from '@/config/paths';
import { loginInputSchema, useLogin } from '@/lib/auth';
import { cn } from '@/utils';

type LoginFormProps = {
  onSuccess: () => void;
  className?: string;
};

export const LoginForm = ({ onSuccess, className, ...props }: LoginFormProps) => {
  const login = useLogin({
    onSuccess,
  });
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Увійдіть у свій обліковий запис</CardTitle>
          <CardDescription>
            Введіть свою електронну адресу нижче, щоб увійти у свій обліковий запис
          </CardDescription>
        </CardHeader>
        <CardContent className={'space-y-4'}>
          <Form
            onSubmit={(values) => {
              login.mutate(values);
            }}
            schema={loginInputSchema}
          >
            {({ register, formState }) => (
              <>
                <Input
                  type="email"
                  label="Email"
                  placeholder="m@example.com"
                  error={formState.errors['email']}
                  registration={register('email')}
                  required
                />
                <div className="flex flex-col gap-2">
                  <Input
                    type="password"
                    label="Пароль"
                    placeholder="Пароль"
                    error={formState.errors['password']}
                    registration={register('password')}
                  />
                  <Link
                    to="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline text-muted-foreground"
                  >
                    Забули пароль?
                  </Link>
                </div>
                <div>
                  <Button isLoading={login.isPending} type="submit" className="w-full">
                    Увійти
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
            Не маєте акаунту?{' '}
            <Link
              to={APP_PATH.auth.register.getHref(redirectTo)}
              className="underline underline-offset-4"
            >
              Зареєструйтесь
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
