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
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Link } from '../ui/link';
import { APP_PATH } from '@/config/paths';

export function Header() {
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
              <Link
                to={APP_PATH.app.resources.getHref()}
                className="flex items-center gap-2 font-semibold"
              >
                <BookOpen className="h-5 w-5" />
                <span>LibHub</span>
              </Link>
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
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to={APP_PATH.app.profile.getHref()} className="flex w-full">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to={APP_PATH.app.root.getHref()} className="flex w-full">
                  Saved Resources
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
