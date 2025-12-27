'use client';

import { useEffect, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '../Logo';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useUser } from '@/app/_contexts/user/UserContext';
import useFetch from '@/hooks/UseFetch';
import { LOGOUT_URL } from '@/utils/Constants';
import { Api_Method } from '@/types/base';
import { toast } from 'sonner';

const NavLinks = {
  auth: [
    {
      label: 'Sign up',
      href: '/signup',
    },
    {
      label: 'Sign in',
      href: '/login',
    },
  ],
  main: [],
};

function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const { user, clearUser } = useUser();
  const pathname = usePathname();
  const { apiFunc, loading } = useFetch<unknown, string>();

  const logoutHandler = async () => {
    const response = await apiFunc(LOGOUT_URL, Api_Method.POST);
    if (response?.ok) {
      clearUser();
      toast.success(response?.data);
    }
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const RenderNavLinks = (links: { label: string; href: string }[]) => {
    return (
      <div className="h-full flex flex-col justify-between items-start md:flex-row md:items-center md:gap-5">
        <div className="h-full w-full flex flex-col gap-2 md:flex-row">
          {links?.map((link) => (
            <Link
              href={link.href}
              key={link.label}
              className={`
                py-2 px-5 md:px-3 md:py-3 flex items-center md:h-full
                font-accent text-lg capitalize tracking-wide
                transition-colors duration-200
                ${
                  pathname === link.href
                    ? 'bg-accent/30 text-accent border-l-3 md:border-0 md:border-b-3 border-accent font-semibold'
                    : 'text-white hover:text-accent'
                }
              `}
            >
              {link.label}
            </Link>
          ))}
        </div>
        {user && (
          <Popover>
            <PopoverTrigger>
              {isMobile ? (
                <div className="flex gap-5 px-6 py-4">
                  <Avatar className="rounded-full bg-accent p-2 size-14 flex justify-center items-center">
                    <AvatarImage src={user?.image}></AvatarImage>
                    <AvatarFallback className="text-xl">
                      {avatar_fallback}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-1">
                    <span className="text-left text-muted-foreground">
                      {user?.full_name}
                    </span>
                    <span className="text-left text-muted-foreground">
                      {user?.email}
                    </span>
                  </div>
                </div>
              ) : (
                <Avatar className="rounded-full bg-accent p-2 size-12 flex justify-center items-center">
                  <AvatarImage src={user?.image}></AvatarImage>
                  <AvatarFallback className="text-xl">
                    {avatar_fallback}
                  </AvatarFallback>
                </Avatar>
              )}
            </PopoverTrigger>
            <PopoverContent
              className="p-0 bg-black/50 backdrop-blur-xl w-fit"
              align="end"
            >
              <div className="flex flex-col gap-1 p-0">
                <Link
                  href="/profile"
                  className="px-4 py-2 rounded-sm hover:bg-accent active:bg-accent cursor-pointer"
                >
                  Profile
                </Link>
                <span
                  onClick={logoutHandler}
                  className="px-4 py-2  rounded-sm hover:bg-accent active:bg-accent cursor-pointer"
                >
                  Logout
                </span>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    );
  };

  const filtered_links = user ? NavLinks?.main : NavLinks?.auth;
  const avatar_fallback = user?.full_name
    .split(' ')
    .map((x: string) => x.charAt(0))
    .join('');

  return (
    <nav
      className={`
        w-full bg-black/30 md:bg-black/50 backdrop-blur-xl transition-all duration-300 border-b border-border/40 rounded-md shadow-[0_8px_30px_rgba(0,0,0,0.4)]
      `}
    >
      <div className="flex h-20 w-full items-center justify-between px-6 lg:px-10">
        <AppLogo className="md:text-6xl" />

        {!isMobile && RenderNavLinks(filtered_links)}

        {/* Mobile Navigation */}
        {isMobile && (
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="
                  p-3 rounded-full
                  transition-all
                  hover:bg-white/10
                "
              >
                <Menu className="size-7 text-accent transition-colors" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="bg-black/30 backdrop-blur-xl border-l border-white/10 w-fit"
            >
              <SheetTitle className="flex h-20 w-full items-center justify-between px-6 lg:px-12">
                <AppLogo />
              </SheetTitle>

              {RenderNavLinks(filtered_links)}
            </SheetContent>
          </Sheet>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
