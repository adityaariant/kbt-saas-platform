'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Store, BrainCircuit, FileText, Settings } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileTab { label: string; href: string; icon: LucideIcon; }

const TABS: MobileTab[] = [
  { label: 'Overview', href: '/', icon: LayoutDashboard },
  { label: 'Marketplace', href: '/marketplace', icon: Store },
  { label: 'Konsultan', href: '/consultant', icon: BrainCircuit },
  { label: 'Laporan', href: '/reports', icon: FileText },
  { label: 'Pengaturan', href: '/settings', icon: Settings },
];

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-dn-border bg-surface md:hidden">
      <ul className="flex h-16 items-stretch">
        {TABS.map((tab) => {
          const isActive = tab.href === '/' ? pathname === '/' : pathname.startsWith(tab.href);
          return (
            <li key={tab.href} className="flex-1">
              <Link href={tab.href} className={cn('flex h-full flex-col items-center justify-center gap-0.5 text-xs transition-colors', isActive ? 'text-primary font-semibold' : 'text-text-muted hover:text-text-secondary')}>
                <tab.icon className={cn('h-5 w-5', isActive ? 'text-primary' : 'text-text-muted')} />
                <span>{tab.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
