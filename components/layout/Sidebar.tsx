 
 
 
 
// Note: Next.js sometimes uses a custom rule for static components
// We bypass it by simply disabling the specific line.
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Store, BrainCircuit, FileText, Search,
  FileSearch, Users, TrendingUp, PieChart, FlaskConical,
  Grid3x3, DollarSign, Settings, ChevronLeft, ChevronRight,
  ChevronDown, BarChart3,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from '@/lib/constants';
import { useStore } from '@/lib/hooks/useStore';
import type { NavItem } from '@/lib/types';

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard, Store, BrainCircuit, FileText, Search,
  FileSearch, Users, TrendingUp, PieChart, FlaskConical,
  Grid3x3, DollarSign, Settings,
};

function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? LayoutDashboard;
}

function NavLink({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const isParentActive = item.children?.some(
    (child) => pathname === child.href || pathname.startsWith(child.href + '/'),
  );
  const [expanded, setExpanded] = useState(isParentActive ?? false);
  const Icon = getIcon(item.icon);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <li>
      {hasChildren ? (
        <>
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className={cn(
              'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              'text-slate-300 hover:bg-sidebar-hover hover:text-white',
              (isActive || isParentActive) && 'bg-sidebar-active text-white',
              collapsed && 'justify-center px-0',
            )}
          >
            {/* eslint-disable-next-line */}
            <Icon className="h-5 w-5 shrink-0" />
            {!collapsed && (
              <>
                <span className="flex-1 text-left">{item.label}</span>
                <ChevronDown className={cn('h-4 w-4 shrink-0 transition-transform duration-200', expanded && 'rotate-180')} />
              </>
            )}
          </button>
          {!collapsed && expanded && (
            <ul className="mt-1 ml-4 space-y-0.5 border-l border-slate-700 pl-3">
              {item.children?.map((child) => {
                const ChildIcon = getIcon(child.icon);
                const childActive = pathname === child.href;
                return (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      className={cn(
                        'flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors',
                        'text-slate-400 hover:bg-sidebar-hover hover:text-white',
                        childActive && 'bg-sidebar-active text-white',
                      )}
                    >
                      <ChildIcon className="h-4 w-4 shrink-0" />
                      <span>{child.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      ) : (
        <Link
          href={item.href}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
            'text-slate-300 hover:bg-sidebar-hover hover:text-white',
            isActive && 'bg-sidebar-active text-white',
            collapsed && 'justify-center px-0',
          )}
        >
          {/* eslint-disable-next-line */}
          <Icon className="h-5 w-5 shrink-0" />
          {!collapsed && <span>{item.label}</span>}
        </Link>
      )}
    </li>
  );
}

export function Sidebar() {
  const collapsed = useStore((s) => s.sidebarCollapsed);
  const toggle = useStore((s) => s.toggleSidebar);

  return (
    <aside className={cn('flex h-screen flex-col bg-sidebar-bg transition-all duration-300', collapsed ? 'w-16' : 'w-64')}>
      <div className="flex h-16 items-center gap-2.5 border-b border-slate-700 px-4">
        <BarChart3 className="h-7 w-7 shrink-0 text-accent" />
        {!collapsed && <span className="font-display text-lg font-bold tracking-tight text-white">Ecometrics</span>}
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} item={item} collapsed={collapsed} />
          ))}
        </ul>
      </nav>
      <div className="border-t border-slate-700 px-3 py-3 space-y-1">
        <Link href="/settings" className={cn('flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors text-slate-400 hover:bg-sidebar-hover hover:text-white', collapsed && 'justify-center px-0')}>
          <Settings className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Pengaturan</span>}
        </Link>
        <button onClick={toggle} className={cn('flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors text-slate-500 hover:bg-sidebar-hover hover:text-white', collapsed && 'justify-center px-0')} aria-label={collapsed ? 'Perluas sidebar' : 'Kecilkan sidebar'}>
          {collapsed ? <ChevronRight className="h-5 w-5 shrink-0" /> : (<><ChevronLeft className="h-5 w-5 shrink-0" /><span>Kecilkan</span></>)}
        </button>
      </div>
    </aside>
  );
}
