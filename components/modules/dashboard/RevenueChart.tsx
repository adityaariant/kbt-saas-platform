'use client';

import { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';
import { salesTrends } from '@/lib/mockData';
import { Download } from 'lucide-react';

type Period = '7H' | '30H' | '90H' | '12B';
type Series = 'sales' | 'orders' | 'aov';

const SERIES_CONFIG: Record<Series, { label: string; color: string }> = {
  sales: { label: 'Pendapatan', color: '#0F4C81' },
  orders: { label: 'Pesanan', color: '#00C49A' },
  aov: { label: 'AOV', color: '#F59E0B' },
};

export function RevenueChart() {
  const [period, setPeriod] = useState<Period>('30H');
  const [activeSeries, setActiveSeries] = useState<Set<Series>>(new Set(['sales']));

  const periodSlice: Record<Period, number> = { '7H': 7, '30H': 30, '90H': 30, '12B': 30 };
  const data = salesTrends.slice(-periodSlice[period]);

  const toggleSeries = (s: Series) => {
    const next = new Set(activeSeries);
    if (next.has(s)) { if (next.size > 1) next.delete(s); }
    else next.add(s);
    setActiveSeries(next);
  };

  return (
    <div className="bg-surface rounded-xl border border-dn-border p-5 lg:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h3 className="text-base font-bold text-text-primary font-display">
          Tren Penjualan
        </h3>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex gap-1 bg-background rounded-lg p-1">
            {(['7H', '30H', '90H', '12B'] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                  period === p
                    ? 'bg-primary text-white'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {(Object.keys(SERIES_CONFIG) as Series[]).map((s) => (
              <button
                key={s}
                onClick={() => toggleSeries(s)}
                className={`flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-md border transition-colors ${
                  activeSeries.has(s)
                    ? 'border-primary/30 bg-primary/5 text-primary'
                    : 'border-dn-border text-text-muted'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: SERIES_CONFIG[s].color }}
                />
                {SERIES_CONFIG[s].label}
              </button>
            ))}
          </div>
          <button className="p-2 rounded-lg hover:bg-surface-hover text-text-muted" title="Export PNG">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
            <defs>
              {(Object.keys(SERIES_CONFIG) as Series[]).map((s) => (
                <linearGradient key={s} id={`grad-${s}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={SERIES_CONFIG[s].color} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={SERIES_CONFIG[s].color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val: number) => `${(val / 1000000).toFixed(0)}M`}
            />
            <Tooltip
              contentStyle={{
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                fontSize: '12px',
              }}
            />
            {activeSeries.has('sales') && (
              <Area
                type="monotone"
                dataKey="sales"
                stroke={SERIES_CONFIG.sales.color}
                strokeWidth={2}
                fill="url(#grad-sales)"
                name="Pendapatan"
              />
            )}
            {activeSeries.has('orders') && (
              <Area
                type="monotone"
                dataKey="orders"
                stroke={SERIES_CONFIG.orders.color}
                strokeWidth={2}
                fill="url(#grad-orders)"
                name="Pesanan"
              />
            )}
            {activeSeries.has('aov') && (
              <Area
                type="monotone"
                dataKey="aov"
                stroke={SERIES_CONFIG.aov.color}
                strokeWidth={2}
                fill="url(#grad-aov)"
                name="AOV"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
