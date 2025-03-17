import { buttonVariants } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useUser } from '@/lib/auth';
import { cn } from '@/utils';

import { NavLink } from 'react-router';
import { useNavRoutes } from '../lib/use-nav-routes';

export function NavSidebar() {
  const user = useUser();
  const navigation = useNavRoutes();

  return (
    <div className="hidden md:flex flex-col w-64 border-r bg-muted/10 sticky top-0 z-30">
      {/* <div className="p-6">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Home className="h-5 w-5" />
          <span>Admin Portal</span>
        </Link>
      </div> */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            {user.data?.firstName?.[0]}
            {user.data?.lastName?.[0]}
          </div>
          <div>
            <p className="text-sm font-medium">
              {user.data?.firstName} {user.data?.lastName}
            </p>
            <p className="text-xs text-muted-foreground">{user.data?.email}</p>
          </div>
        </div>
      </div>
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 py-2">
          {navigation.map(({ name, path, Icon }) => (
            <NavLink
              key={path}
              to={path}
              end
              className={({ isActive }) =>
                cn(
                  buttonVariants({ variant: 'ghost' }),
                  'w-full justify-start gap-3',
                  isActive && 'bg-secondary',
                )
              }
            >
              <Icon className="size-5 shrink-0" aria-hidden="true" />
              {name}
            </NavLink>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
