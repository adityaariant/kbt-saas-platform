'use client';

import { X, Star } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { CHANNEL_COLORS, CHANNEL_LABELS } from '@/lib/constants';
import { seededRandom, formatRp } from '@/lib/utils';

interface ProductData {
  id: number;
  name: string;
  sku: string;
  category: string;
  units: number;
  revenue: number;
  trend: number[];
}

interface ProductDetailDrawerProps {
  product: ProductData | null;
  onClose: () => void;
}

export function ProductDetailDrawer({ product, onClose }: ProductDetailDrawerProps) {
  if (!product) return null;

  const chartData = product.trend.map((val, i) => ({ day: `H${i + 1}`, value: val }));
  const channelBreakdown = [
    { channel: 'shopee', pct: Math.round(seededRandom(product.id * 7) * 40 + 20) },
    { channel: 'tokopedia', pct: Math.round(seededRandom(product.id * 11) * 30 + 20) },
    { channel: 'lazada', pct: 0 },
  ];
  channelBreakdown[2].pct = 100 - channelBreakdown[0].pct - channelBreakdown[1].pct;
  const rating = (4 + seededRandom(product.id * 3) * 0.8).toFixed(1);
  const reviews = Math.floor(seededRandom(product.id * 13) * 500) + 50;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-full max-w-md bg-surface h-full overflow-y-auto shadow-2xl animate-slide-right border-l border-dn-border">
        <div className="sticky top-0 bg-surface z-10 flex items-center justify-between p-5 border-b border-dn-border">
          <div>
            <h3 className="font-bold text-text-primary font-display">{product.name}</h3>
            <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full font-medium">
              {product.category}
            </span>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-surface-hover text-text-muted">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Chart */}
          <div>
            <p className="text-sm font-semibold text-text-secondary mb-3">Tren 7 Hari Terakhir</p>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="productGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0F4C81" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#0F4C81" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="value" stroke="#0F4C81" strokeWidth={2} fill="url(#productGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Channel Breakdown */}
          <div>
            <p className="text-sm font-semibold text-text-secondary mb-3">Distribusi Platform</p>
            <div className="flex h-3 rounded-full overflow-hidden bg-background">
              {channelBreakdown.map((ch) => (
                <div
                  key={ch.channel}
                  style={{ width: `${ch.pct}%`, backgroundColor: CHANNEL_COLORS[ch.channel] }}
                  className="transition-all"
                />
              ))}
            </div>
            <div className="flex gap-4 mt-2">
              {channelBreakdown.map((ch) => (
                <div key={ch.channel} className="flex items-center gap-1.5 text-xs">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: CHANNEL_COLORS[ch.channel] }} />
                  <span className="text-text-muted">{CHANNEL_LABELS[ch.channel]}</span>
                  <span className="font-semibold text-text-primary font-mono">{ch.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
            <Star className="w-5 h-5 text-warning fill-warning" />
            <span className="text-lg font-bold text-text-primary font-mono">{rating}</span>
            <span className="text-sm text-text-muted">· {reviews} ulasan</span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-background rounded-lg">
              <p className="text-xs text-text-muted mb-1">Unit Terjual</p>
              <p className="text-lg font-bold text-text-primary font-mono">{product.units.toLocaleString('id-ID')}</p>
            </div>
            <div className="p-3 bg-background rounded-lg">
              <p className="text-xs text-text-muted mb-1">Pendapatan</p>
              <p className="text-lg font-bold text-text-primary font-mono">{formatRp(product.revenue)}</p>
            </div>
          </div>

          {/* Insight */}
          <div className="p-4 bg-warning/10 border border-warning/30 rounded-lg">
            <p className="text-sm font-semibold text-warning mb-1">💡 Insight</p>
            <p className="text-sm text-text-secondary">
              Produk ini memiliki risiko churn 23%. Pertimbangkan flash sale atau bundling
              untuk mempertahankan momentum penjualan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
