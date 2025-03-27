import { BookOpen, Menu, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Link } from '../ui/link';
import { APP_PATH } from '@/config/paths';
import { Authorization, ROLES } from '@/lib/authorization';
import { useLogout } from '@/lib/auth';

export function Header() {
  const logout = useLogout();
  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2 md:gap-4 grow">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <SheetHeader>
                <SheetTitle>
                  <Link
                    to={APP_PATH.app.resources.getHref()}
                    className="flex items-center gap-2 font-semibold"
                  >
                    <BookOpen className="h-5 w-5" />
                    <span>LibHub</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <Link
            to={APP_PATH.app.resources.getHref()}
            className="flex items-center gap-2 font-semibold text-primary text-lg mx-auto md:mx-0"
          >
            <BookOpen className="size-6" />
            {/* <span className="hidden md:inline-block">LibHub</span> */}
            <span className="inline-block">LibHub</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full shadow-md">
                <User className="size-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Мій аккаунт</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to={APP_PATH.app.profile.getHref()} className="flex w-full">
                  Профіль
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to={APP_PATH.app.savedResources.getHref()} className="flex w-full">
                  Збережені
                </Link>
              </DropdownMenuItem>
              <Authorization allowedRoles={[ROLES.ADMIN, ROLES.EDITOR]}>
                <DropdownMenuItem>
                  <Link to={APP_PATH.app.dashboard.root.getHref()} className="flex w-full">
                    Панель управління
                  </Link>
                </DropdownMenuItem>
              </Authorization>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout.mutate}>Вийти з аккаунта</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
