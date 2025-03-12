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
          <CardTitle className="text-xl">Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
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
                    label="Password"
                    placeholder={'Password'}
                    error={formState.errors['password']}
                    registration={register('password')}
                  />
                  <Link
                    to="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline text-muted-foreground"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <div>
                  <Button isLoading={login.isPending} type="submit" className="w-full">
                    Log in
                  </Button>
                </div>
              </>
            )}
          </Form>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">Or</span>
          </div>
          <Button
            variant="outline"
            className="w-full"
            icon={<img src={googleLogo} alt="Google Logo" className="size-4" />}
          >
            Continue with Google
          </Button>
          <div className="text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link
              to={APP_PATH.auth.register.getHref(redirectTo)}
              className="underline underline-offset-4"
            >
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and{' '}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};
