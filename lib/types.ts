// ============================================================
// Ecommetrics — All shared TypeScript interfaces
// ============================================================

export type Channel = 'shopee' | 'tokopedia' | 'lazada';
export type CompetitionLevel = 'low' | 'medium' | 'high';
export type NotificationType = 'sales_drop' | 'forecast_drop' | 'ab_significant' | 'competitor_new' | 'system';

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
}

export interface SaleRecord {
  date: string;
  productId: string;
  channel: Channel;
  qty: number;
  revenue: number;
}

export interface Customer {
  id: string;
  name: string;
  totalSpend: number;
  orderCount: number;
  lastOrderDate: string;
  segment: string;
  recencyScore: number;
  frequencyScore: number;
  monetaryScore: number;
}

export interface Keyword {
  keyword: string;
  volume: number;
  competition: CompetitionLevel;
  yourRank: number | null;
  opportunityScore: number;
  trend: number[];
}

export interface Competitor {
  id: string;
  name: string;
  platform: string;
  productCount: number;
  avgPrice: number;
  rating: number;
  topKeywords: string[];
}

export interface AppNotification {
  id: string;
  type: NotificationType;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface Store {
  id: string;
  name: string;
  platform: Channel;
  category: string;
  status: 'active' | 'inactive';
}

export interface AbTestResult {
  experimentName: string;
  metric: string;
  groupASize: number;
  groupAConversions: number;
  groupBSize: number;
  groupBConversions: number;
  pValue: number;
  significant: boolean;
  confidenceInterval: [number, number];
}

export interface ForecastPoint {
  week: string;
  actual: number | null;
  forecast: number;
  lower: number;
  upper: number;
}

export interface CohortRow {
  cohort: string;
  months: number[];
}

export interface ElasticityPoint {
  price: number;
  demand: number;
}

export interface InvoiceRecord {
  id: string;
  date: string;
  plan: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  maskedKey: string;
  createdAt: string;
  lastUsed: string;
  status: 'active' | 'revoked';
}

export interface KpiMetric {
  label: string;
  value: number;
  formattedValue: string;
  delta: number;
  sparkline: number[];
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  children?: NavItem[];
}

export interface SalesHeatmapCell {
  day: number;
  hour: number;
  count: number;
}
