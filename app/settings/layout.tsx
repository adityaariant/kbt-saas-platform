'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Store, Bell, CreditCard, Key } from 'lucide-react';
import { cn } from '@/lib/utils';

const SETTINGS_NAV = [
  { label: 'Profil Saya', href: '/settings/profile', icon: User },
  { label: 'Manajemen Toko', href: '/settings/stores', icon: Store },
  { label: 'Notifikasi', href: '/settings/notifications', icon: Bell },
  { label: 'Paket & Tagihan', href: '/settings/billing', icon: CreditCard },
  { label: 'API Keys', href: '/settings/api-keys', icon: Key },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary font-display">Pengaturan</h2>
        <p className="text-sm text-text-muted mt-1">Kelola preferensi akun dan platform Anda</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-64 shrink-0">
          <nav className="flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0">
            {SETTINGS_NAV.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
                    isActive 
                      ? 'bg-primary/10 text-primary border border-primary/20' 
                      : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary border border-transparent'
                  )}
                >
                  <item.icon className={cn('w-4.5 h-4.5', isActive ? 'text-primary' : 'text-text-muted')} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="bg-surface rounded-xl border border-dn-border p-6 min-h-[500px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
