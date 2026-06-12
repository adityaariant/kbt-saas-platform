'use client';

import { create } from 'zustand';
import type { AppNotification, Store } from '../types';
import { notifications as initialNotifications, stores as initialStores } from '../mockData';

interface AppStore {
  // Sidebar
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;

  // Active store
  activeStoreId: string;
  storesList: Store[];
  setActiveStore: (id: string) => void;
  addStore: (store: Store) => void;
  removeStore: (id: string) => void;

  // Goals
  revenueGoal: number;
  orderGoal: number;
  setGoals: (revenue: number, orders: number) => void;

  // Notifications
  notifications: AppNotification[];
  markAllRead: () => void;
  unreadCount: () => number;

  // Notification preferences
  notifPrefs: Record<string, boolean>;
  setNotifPref: (key: string, enabled: boolean) => void;
  salesDropThreshold: number;
  setSalesDropThreshold: (val: number) => void;
}

export const useStore = create<AppStore>((set, get) => ({
  // Sidebar
  sidebarCollapsed: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

  // Active store
  activeStoreId: 'STORE-001',
  storesList: initialStores,
  setActiveStore: (id: string) => set({ activeStoreId: id }),
  addStore: (store: Store) => set((s) => ({ storesList: [...s.storesList, store] })),
  removeStore: (id: string) => set((s) => ({
    storesList: s.storesList.filter(st => st.id !== id),
    activeStoreId: s.activeStoreId === id ? (s.storesList[0]?.id ?? '') : s.activeStoreId,
  })),

  // Goals
  revenueGoal: 150000000,
  orderGoal: 5000,
  setGoals: (revenue: number, orders: number) => set({ revenueGoal: revenue, orderGoal: orders }),

  // Notifications
  notifications: initialNotifications,
  markAllRead: () => set((s) => ({
    notifications: s.notifications.map(n => ({ ...n, read: true })),
  })),
  unreadCount: () => get().notifications.filter(n => !n.read).length,

  // Notification preferences
  notifPrefs: {
    sales_drop: true,
    forecast_drop: true,
    ab_significant: true,
    competitor_new: false,
  },
  setNotifPref: (key: string, enabled: boolean) => set((s) => ({
    notifPrefs: { ...s.notifPrefs, [key]: enabled },
  })),
  salesDropThreshold: 20,
  setSalesDropThreshold: (val: number) => set({ salesDropThreshold: val }),
}));
