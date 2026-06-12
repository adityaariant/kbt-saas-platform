'use client';

import { usePathname } from 'next/navigation';
import { ThemeProvider } from 'next-themes';
import { Sidebar } from '@/components/layout/Sidebar';
import { Navbar } from '@/components/layout/Navbar';
import { MobileNav } from '@/components/layout/MobileNav';
import { AiAssistantButton } from '@/components/ai/AiAssistantButton';
import { cn } from '@/lib/utils';

const AUTH_ROUTES = ['/login', '/register', '/forgot-password'];
const ONBOARDING_ROUTE = '/onboarding';

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isAuthPage = AUTH_ROUTES.some((r) => pathname.startsWith(r));
  const isOnboarding = pathname.startsWith(ONBOARDING_ROUTE);
  const showChrome = !isAuthPage && !isOnboarding;

  return (
    <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={false}>
      {showChrome ? (
        <div className="flex h-screen overflow-hidden bg-background">
          <div className="hidden md:block">
            <Sidebar />
          </div>
          <div className="flex-1 flex flex-col min-w-0">
            <Navbar />
            <main className="flex-1 overflow-y-auto">
              <div className={cn(
                'p-4 md:p-6 lg:p-8 max-w-[1440px] mx-auto w-full animate-fade-in',
              )}>
                {children}
              </div>
            </main>
            <div className="md:hidden">
              <MobileNav />
            </div>
          </div>
          <AiAssistantButton />
        </div>
      ) : (
        <>{children}</>
      )}
    </ThemeProvider>
  );
}
