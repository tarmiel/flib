import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ROLES } from '@/lib/authorization';
import { inviteUserInputSchema, type InviteUserInput } from '../api/invite-user';

interface InviteUserFormProps extends Omit<React.ComponentPropsWithRef<'form'>, 'onSubmit'> {
  children: React.ReactNode;
  onSubmit: (data: InviteUserInput) => void;
}

export function InviteUserForm({ children, ...props }: InviteUserFormProps) {
  return (
    <>
      <Form
        id="invite-user"
        schema={inviteUserInputSchema}
        options={{
          defaultValues: {
            email: '',
            role: ROLES.USER,
          },
        }}
        {...props}
      >
        {({ register, formState, control }) => (
          <>
            <Input
              label="Email"
              type="email"
              placeholder="m@example.com"
              error={formState.errors['email']}
              registration={register('email')}
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
