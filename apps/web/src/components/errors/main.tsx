import { cn } from '@/utils';
import { Button } from '../ui/button';

export const MainErrorFallback = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'flex h-screen w-screen flex-col items-center justify-center text-red-500',
        className,
      )}
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
      <Button className="mt-4" onClick={() => window.location.reload()}>
        Refresh
      </Button>
    </div>
  );
};
