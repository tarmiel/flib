import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { InviteUserForm } from './invite-user-form';
import { useState } from 'react';
import { UserPlus } from 'lucide-react';

type InviteUserDialogProps = React.ComponentPropsWithRef<typeof Dialog>;

export const InviteUserDialog = ({ ...props }: InviteUserDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen} {...props}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          icon={<UserPlus className="mr-2 h-4 w-4" />}
          className={'space-x-0 h-8'}
        >
          Запросити
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Запросити нового користувача</DialogTitle>
          <DialogDescription>Надішліть запрошення для приєднання до системи.</DialogDescription>
        </DialogHeader>
        <InviteUserForm
          onSubmit={(values) => {
            // inviteUserMutation.mutate({ data: values });
            console.log(values);
          }}
        >
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Скасувати</Button>
            </DialogClose>
            <Button disabled={false} isLoading={false}>
              Надіслати запрошення
            </Button>
          </DialogFooter>
        </InviteUserForm>
      </DialogContent>
    </Dialog>
  );
};
