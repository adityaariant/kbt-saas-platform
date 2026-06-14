import type { NavItem } from './types';

export const APP_NAME = 'Ecometrics';
export const APP_TAGLINE = 'Jual Lebih Cerdas, Bukan Lebih Keras.';

export const CATEGORIES = ['Fashion', 'Elektronik', 'Rumah Tangga', 'Kecantikan'] as const;
export const CHANNELS = ['shopee', 'tokopedia', 'lazada'] as const;
export const CHANNEL_LABELS: Record<string, string> = {
  shopee: 'Shopee',
  tokopedia: 'Tokopedia',
  lazada: 'Lazada',
};

export const CHANNEL_COLORS: Record<string, string> = {
  shopee: '#EE4D2D',
  tokopedia: '#42B549',
  lazada: '#0F146D',
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', href: '/', icon: 'LayoutDashboard' },
  {
    label: 'Marketplace',
    href: '/marketplace',
    icon: 'Store',
    children: [
      { label: 'Keywords', href: '/marketplace/keywords', icon: 'Search' },
      { label: 'Listing Analyzer', href: '/marketplace/listing-analyzer', icon: 'FileSearch' },
      { label: 'Competitor Tracker', href: '/marketplace/competitor-tracker', icon: 'Users' },
    ],
  },
  {
    label: 'Konsultan Bisnis',
    href: '/consultant',
    icon: 'BrainCircuit',
    children: [
      { label: 'Forecasting', href: '/consultant/forecasting', icon: 'TrendingUp' },
      { label: 'Segmentasi', href: '/consultant/customer-segments', icon: 'PieChart' },
      { label: 'A/B Testing', href: '/consultant/ab-testing', icon: 'FlaskConical' },
      { label: 'Cohort', href: '/consultant/cohort', icon: 'Grid3x3' },
      { label: 'Elastisitas Harga', href: '/consultant/price-elasticity', icon: 'DollarSign' },
    ],
  },
  { label: 'Laporan', href: '/reports', icon: 'FileText' },
];

export const SETTINGS_NAV: NavItem[] = [
  { label: 'Profil', href: '/settings/profile', icon: 'User' },
  { label: 'Toko', href: '/settings/stores', icon: 'Store' },
  { label: 'Notifikasi', href: '/settings/notifications', icon: 'Bell' },
  { label: 'Tagihan', href: '/settings/billing', icon: 'CreditCard' },
  { label: 'API Keys', href: '/settings/api-keys', icon: 'Key' },
];

export const PLAN_TIERS = [
  {
    name: 'Gratis',
    price: 0,
    priceLabel: 'Rp 0',
    features: ['1 toko', 'Dashboard dasar', '30 hari riwayat', 'Export CSV'],
    cta: 'Paket Saat Ini',
    highlighted: false,
  },
  {
    name: 'Starter',
    price: 199000,
    priceLabel: 'Rp 199K/bln',
    features: ['3 toko', 'Semua dashboard', '90 hari riwayat', 'A/B Testing', 'Forecasting dasar'],
    cta: 'Upgrade ke Starter',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: 499000,
    priceLabel: 'Rp 499K/bln',
    features: ['5 toko', 'Semua fitur', '365 hari riwayat', 'AI Assistant', 'Priority support', 'API akses'],
    cta: 'Upgrade ke Pro',
    highlighted: true,
  },
];

export const NOTIFICATION_TYPES = [
  { key: 'sales_drop', label: 'Penjualan turun >20% hari ini', defaultEnabled: true },
  { key: 'forecast_drop', label: 'Prediksi permintaan turun pekan depan', defaultEnabled: true },
  { key: 'ab_significant', label: 'A/B test mencapai signifikansi', defaultEnabled: true },
  { key: 'competitor_new', label: 'Kompetitor baru terdeteksi di keyword X', defaultEnabled: false },
] as const;

export const DAYS_OF_WEEK = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
export const HOURS = Array.from({ length: 24 }, (_, i) => i);
