import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useNotifications } from '@/components/ui/notifications';
import type { User } from '@/types/api';
import { useUpdateProfile } from '../api/update-profile';
import { UpdateUserForm } from './update-user-form';

interface UpdateUserDialogProps extends React.ComponentPropsWithRef<typeof Dialog> {
  user: User | null;
}

export const UpdateUserDialog = ({ user, ...props }: UpdateUserDialogProps) => {
  const { addNotification } = useNotifications();
  const updateProfileMutation = useUpdateProfile({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Профіль оновлено',
        });
      },
    },
  });

  return (
    <Dialog {...props}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Редагування користувача</DialogTitle>
          <DialogDescription>Оновіть інформацію та права доступу користувача.</DialogDescription>
        </DialogHeader>
        <UpdateUserForm
          onSubmit={(values) => {
            // updateProfileMutation.mutate({ data: values });
            console.log(values);
          }}
          user={user}
        >
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Скасувати</Button>
            </DialogClose>
            <Button
              disabled={updateProfileMutation.isPending}
              isLoading={updateProfileMutation.isPending}
            >
              Зберегти
            </Button>
          </DialogFooter>

          {/* <SheetFooter className="gap-2 pt-2 sm:space-x-0">
            <SheetClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </SheetClose>
            <Button disabled={isPending}>
              {isPending && <Loader className="mr-2 size-4 animate-spin" aria-hidden="true" />}
              Save
            </Button>
          </SheetFooter> */}
        </UpdateUserForm>
      </DialogContent>
    </Dialog>
  );
};
