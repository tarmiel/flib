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
import type { User } from '@/types/api';
import { useUpdateUser } from '../api/update-user';
import { UpdateUserForm } from './update-user-form';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { getUsersQueryOptions } from '../api/get-users';

interface UpdateUserDialogProps extends React.ComponentPropsWithRef<typeof Dialog> {
  user: User | null;
  page?: number;
}

export const UpdateUserDialog = ({ user, ...props }: UpdateUserDialogProps) => {
  const queryClient = useQueryClient();
  const updateUserMutation = useUpdateUser({
    mutationConfig: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getUsersQueryOptions({ page: props.page }).queryKey,
        });
        toast.success(`Профіль користувача оновлено`);
        props.onOpenChange?.(false);
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
            updateUserMutation.mutate({ data: values, userId: user?.id ?? '' });
          }}
          user={user}
        >
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Скасувати</Button>
            </DialogClose>
            <Button
              disabled={updateUserMutation.isPending}
              isLoading={updateUserMutation.isPending}
            >
              Зберегти
            </Button>
          </DialogFooter>
        </UpdateUserForm>
      </DialogContent>
    </Dialog>
  );
};
