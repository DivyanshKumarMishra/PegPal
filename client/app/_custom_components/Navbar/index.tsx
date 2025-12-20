'use client';

import { useEffect, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '../Logo';

const NavLinks = [
  { href: '/login', text: 'Login' },
  { href: '/signup', text: 'Signup' },
];

function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  // console.log(pathname);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav
      className={`
        sticky top-0 z-50 w-full
        bg-black/50
        backdrop-blur-xl
        transition-all duration-300
        border-b border-border/40
        shadow-[0_8px_30px_rgba(0,0,0,0.4)]
      `}
    >
      <div className="flex h-15 w-full items-center justify-between px-6 lg:px-12">
        <AppLogo />

        {!isMobile && (
          <div className="flex items-center gap-2 h-full">
            {NavLinks.map((link) => (
              <Link
                href={link.href}
                key={link.text}
                className={`
                    px-5 py-3 flex items-center h-full
                    font-accent text-md uppercase tracking-wide
                    transition-colors duration-200
                    ${
                      pathname === link.href
                        ? 'bg-accent/30 text-accent border-b-3 border-accent'
                        : 'text-white hover:text-accent'
                    }
                  `}
              >
                {link.text}
              </Link>
            ))}
          </div>
        )}

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
              className="bg-black/50 backdrop-blur-xl border-l border-white/10"
            >
              <SheetTitle className="flex h-15 w-full items-center justify-between px-6 lg:px-12">
                <AppLogo />
              </SheetTitle>

              <nav className="flex flex-col gap-8">
                {NavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="
                      font-accent text-xl
                      text-white/70
                      transition-all duration-300
                      hover:text-white
                      hover:translate-x-1
                    "
                  >
                    {link.text}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
