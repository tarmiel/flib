import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { User } from '@/types/api';
import { updateProfileInputSchema, type UpdateProfileInput } from '../api/update-profile';
import { ROLES } from '@/lib/authorization';

interface UserFormProps extends Omit<React.ComponentPropsWithRef<'form'>, 'onSubmit'> {
  children: React.ReactNode;
  onSubmit: (data: UpdateProfileInput) => void;
  user?: User | null;
}

export function UpdateUserForm({ children, user, ...props }: UserFormProps) {
  return (
    <>
      <Form
        id="update-user"
        schema={updateProfileInputSchema}
        options={{
          defaultValues: {
            firstName: user?.firstName ?? '',
            lastName: user?.lastName ?? '',
            email: user?.email ?? '',
            additionalInfo: user?.additionalInfo ?? '',
            role: user?.role as User['role'],
          },
        }}
        {...props}
      >
        {({ register, formState, control }) => (
          <>
            <Input
              label="Ім'я"
              placeholder={"Ім'я"}
              error={formState.errors['firstName']}
              registration={register('firstName')}
            />
            <Input
              label="Прізвище"
              placeholder={'Прізвище"'}
              error={formState.errors['lastName']}
              registration={register('lastName')}
            />

            <Input
              label="Email"
              type="email"
              placeholder="m@example.com"
              error={formState.errors['email']}
              registration={register('email')}
              disabled
            />

            <Textarea
              label="Додаткова інформація"
              error={formState.errors['additionalInfo']}
              registration={register('additionalInfo')}
            />

            <FormField
              control={control}
              name={'role'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Роль</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Оберіть роль" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={ROLES.USER}>Користувач</SelectItem>
                      <SelectItem value={ROLES.EDITOR}>Редактор</SelectItem>
                      <SelectItem value={ROLES.ADMIN}>Адміністратор</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {children}
          </>
        )}
      </Form>
    </>
  );
}
