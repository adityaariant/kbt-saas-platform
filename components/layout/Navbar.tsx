'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Menu, Sun, Moon, ChevronDown, User, Settings, LogOut, Store } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStore } from '@/lib/hooks/useStore';
import { NAV_ITEMS } from '@/lib/constants';
import { NotificationBell } from './NotificationBell';
import type { NavItem } from '@/lib/types';

function getPageTitle(pathname: string, items: NavItem[]): string {
  for (const item of items) {
    if (item.href === pathname) return item.label;
    if (item.children) {
      for (const child of item.children) {
        if (child.href === pathname) return child.label;
      }
    }
  }
  if (pathname.startsWith('/settings')) return 'Pengaturan';
  if (pathname.startsWith('/reports')) return 'Laporan';
  return 'Ecometrics';
}

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const toggleSidebar = useStore((s) => s.toggleSidebar);
  const storesList = useStore((s) => s.storesList);
  const activeStoreId = useStore((s) => s.activeStoreId);
  const setActiveStore = useStore((s) => s.setActiveStore);
  const activeStore = storesList.find((s) => s.id === activeStoreId);

  const [storeOpen, setStoreOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const storeRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const title = getPageTitle(pathname, NAV_ITEMS);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (storeRef.current && !storeRef.current.contains(e.target as Node)) setStoreOpen(false);
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) setAvatarOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className="flex h-16 items-center gap-4 border-b border-dn-border bg-surface px-4 lg:px-6">
      <button onClick={toggleSidebar} className="rounded-lg p-2 text-text-secondary hover:bg-surface-hover lg:hidden" aria-label="Menu">
        <Menu className="h-5 w-5" />
      </button>
      <h1 className="font-display text-lg font-semibold text-text-primary truncate">{title}</h1>
      <div className="flex-1" />

      <div ref={storeRef} className="relative hidden sm:block">
        <button onClick={() => setStoreOpen((p) => !p)} className="flex items-center gap-2 rounded-lg border border-dn-border px-3 py-1.5 text-sm text-text-primary hover:bg-surface-hover">
          <Store className="h-4 w-4 text-text-muted" />
          <span className="max-w-[150px] truncate">{activeStore?.name ?? 'Pilih Toko'}</span>
          <ChevronDown className={cn('h-4 w-4 text-text-muted transition-transform', storeOpen && 'rotate-180')} />
        </button>
        {storeOpen && (
          <div className="absolute right-0 top-full z-50 mt-1.5 w-56 rounded-xl border border-dn-border bg-surface shadow-xl animate-fade-in">
            <ul className="py-1">
              {storesList.map((store) => (
                <li key={store.id}>
                  <button onClick={() => { setActiveStore(store.id); setStoreOpen(false); }} className={cn('flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-surface-hover', store.id === activeStoreId ? 'font-medium text-primary' : 'text-text-secondary')}>
                    <Store className="h-4 w-4 shrink-0" /><span className="truncate">{store.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="rounded-lg p-2 text-text-secondary hover:bg-surface-hover hover:text-text-primary" aria-label="Ganti tema">
        {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>

      <NotificationBell />

      <div ref={avatarRef} className="relative">
        <button onClick={() => setAvatarOpen((p) => !p)} className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-white hover:opacity-90" aria-label="Menu pengguna">DN</button>
        {avatarOpen && (
          <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-dn-border bg-surface shadow-xl animate-fade-in">
            <ul className="py-1">
              {[{ label: 'Profil', icon: User, href: '/settings/profile' }, { label: 'Pengaturan', icon: Settings, href: '/settings' }].map((item) => (
                <li key={item.label}>
                  <a href={item.href} onClick={() => setAvatarOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:bg-surface-hover hover:text-text-primary">
                    <item.icon className="h-4 w-4" /><span>{item.label}</span>
                  </a>
                </li>
              ))}
              <li className="border-t border-dn-border">
                <button onClick={() => setAvatarOpen(false)} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-danger hover:bg-surface-hover">
                  <LogOut className="h-4 w-4" /><span>Keluar</span>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
