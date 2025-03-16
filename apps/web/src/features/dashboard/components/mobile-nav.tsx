'use client';

import { useState } from 'react';

import { Home, Menu } from 'lucide-react';

import { Button, buttonVariants } from '@/components/ui/button';
import { Link } from '@/components/ui/link';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/utils';
import { NavLink } from 'react-router';
import { useNavRoutes } from '../lib/use-nav-routes';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const routes = useNavRoutes();

  return (
    <>
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh] rounded-t-xl">
            <SheetHeader className="mb-4">
              <SheetTitle>LibHub</SheetTitle>
            </SheetHeader>
            <ScrollArea className="grid gap-2 py-4">
              <div className="space-y-1 py-2">
                {routes.map(({ name, path, Icon }) => (
                  <NavLink
                    key={path}
                    to={path}
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
              <div className="mt-4 pt-4 border-t">
                <Link
                  to="/app"
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'w-full justify-center flex items-center gap-3 text-primary',
                  )}
                  onClick={() => setOpen(false)}
                >
                  <Home className="h-5 w-5" />
                  Back to Home
                </Link>
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
