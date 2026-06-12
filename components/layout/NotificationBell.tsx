'use client';

import { useState, useRef, useEffect } from 'react';
import { Bell, TrendingDown, FlaskConical, Users, Info, AlertTriangle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStore } from '@/lib/hooks/useStore';
import type { NotificationType } from '@/lib/types';

const TYPE_CONFIG: Record<NotificationType, { icon: LucideIcon; color: string }> = {
  sales_drop: { icon: TrendingDown, color: 'text-danger' },
  forecast_drop: { icon: AlertTriangle, color: 'text-warning' },
  ab_significant: { icon: FlaskConical, color: 'text-accent' },
  competitor_new: { icon: Users, color: 'text-info' },
  system: { icon: Info, color: 'text-text-secondary' },
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Baru saja';
  if (minutes < 60) return `${minutes} menit lalu`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} hari lalu`;
  return `${Math.floor(days / 30)} bulan lalu`;
}

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const notifications = useStore((s) => s.notifications);
  const markAllRead = useStore((s) => s.markAllRead);
  const unreadCount = useStore((s) => s.unreadCount);
  const count = unreadCount();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen((p) => !p)} className="relative rounded-lg p-2 text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors" aria-label="Notifikasi">
        <Bell className="h-5 w-5" />
        {count > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[10px] font-bold text-white">{count > 9 ? '9+' : count}</span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-xl border border-dn-border bg-surface shadow-xl animate-fade-in">
          <div className="flex items-center justify-between border-b border-dn-border px-4 py-3">
            <h3 className="font-display text-sm font-semibold text-text-primary">Notifikasi</h3>
            {count > 0 && <button onClick={markAllRead} className="text-xs font-medium text-primary hover:text-primary-light">Tandai semua dibaca</button>}
          </div>
          <ul className="max-h-80 overflow-y-auto divide-y divide-dn-border">
            {notifications.map((n) => {
              const config = TYPE_CONFIG[n.type];
              const Icon = config.icon;
              return (
                <li key={n.id} className={cn('flex gap-3 px-4 py-3 hover:bg-surface-hover', !n.read && 'bg-primary/5')}>
                  <div className={cn('mt-0.5 shrink-0', config.color)}><Icon className="h-4 w-4" /></div>
                  <div className="min-w-0 flex-1">
                    <p className={cn('text-sm leading-snug', n.read ? 'text-text-secondary' : 'text-text-primary font-medium')}>{n.message}</p>
                    <span className="mt-0.5 block text-xs text-text-muted">{timeAgo(n.createdAt)}</span>
                  </div>
                  {!n.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
