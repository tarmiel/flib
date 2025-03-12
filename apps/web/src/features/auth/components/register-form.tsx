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
          <CardTitle className="text-xl">Create Your Account</CardTitle>
          <CardDescription>Enter your details below to create a new account</CardDescription>
        </CardHeader>
        <CardContent className={'space-y-4'}>
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
                  label="First Name"
                  placeholder={'First Name'}
                  error={formState.errors['firstName']}
                  registration={register('firstName')}
                />
                <Input
                  type="text"
                  label="Last Name"
                  placeholder={'Last Name'}
                  error={formState.errors['lastName']}
                  registration={register('lastName')}
                />
                <Input
                  type="email"
                  label="Email"
                  placeholder="m@example.com"
                  error={formState.errors['email']}
                  registration={register('email')}
                />
                <Input
                  type="password"
                  label="Password"
                  placeholder={'Password'}
                  error={formState.errors['password']}
                  registration={register('password')}
                />

                <div>
                  <Button isLoading={registering.isPending} type="submit" className="w-full">
                    Register
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
            Already have an account?{' '}
            <Link
              to={APP_PATH.auth.login.getHref(redirectTo)}
              className="underline underline-offset-4"
            >
              Log in
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
