import type { Row } from '@tanstack/react-table';
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
import type { Resource } from '@/types/api';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { useDeleteResources } from '../api/delete-resource';

interface DeleteResourcesDialogProps extends React.ComponentPropsWithoutRef<typeof Dialog> {
  resources: Row<Resource>['original'][];
  showTrigger?: boolean;
  onSuccess?: () => void;
}

export function DeleteResourcesDialog({
  resources,
  showTrigger = true,
  onSuccess,
  ...props
}: DeleteResourcesDialogProps) {
  const deleteResourcesMutation = useDeleteResources();
  const handleDeleteResources = () => {
    deleteResourcesMutation.mutate({
      resourceIds: resources.map((resource) => resource.id),
    });
    props.onOpenChange?.(false);
    onSuccess?.();
  };

  return (
    <Dialog {...props}>
      {showTrigger ? (
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            icon={<Trash className="mr-2 size-4" aria-hidden="true" />}
          >
            Delete ({resources.length})
          </Button>
        </DialogTrigger>
      ) : null}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your{' '}
            <span className="font-medium">{resources.length}</span>
            {resources.length === 1 ? ' resource' : ' resources'} from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:space-x-0">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            aria-label="Delete selected rows"
            variant="destructive"
            onClick={handleDeleteResources}
            disabled={false}
            isLoading={false}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
