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
          defaultValues: { ...(user ?? {}) },
        }}
        {...props}
      >
        {({ register, formState, control }) => (
          <>
            <Input
              label="First Name"
              placeholder={'First Name'}
              error={formState.errors['firstName']}
              registration={register('firstName')}
            />
            <Input
              label="Last Name"
              placeholder={'Last Name'}
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
              label="Additional Info"
              error={formState.errors['additionalInfo']}
              registration={register('additionalInfo')}
            />

            <FormField
              control={control}
              name={'role'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="USER">User</SelectItem>
                      <SelectItem value="EDITOR">Editor</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
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
