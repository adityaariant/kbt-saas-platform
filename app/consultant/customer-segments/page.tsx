'use client';
import { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { customers } from '@/lib/mockData';
import { formatRp } from '@/lib/utils';
import { X } from 'lucide-react';

const SEGMENT_COLORS: Record<string, string> = { Champions: '#00C49A', Loyal: '#0F4C81', Potential: '#3B82F6', New: '#8B5CF6', 'At Risk': '#F59E0B', Lost: '#EF4444' };
const segments = [...new Set(customers.map((c) => c.segment))];

const segmentSummary = segments.map((seg) => {
  const group = customers.filter((c) => c.segment === seg);
  const avgRevenue = group.reduce((s, c) => s + c.totalSpend, 0) / group.length;
  const avgOrders = group.reduce((s, c) => s + c.orderCount, 0) / group.length;
  const recommendations: Record<string, string> = { Champions: 'Berikan rewards & early access', Loyal: 'Upsell produk premium', Potential: 'Kirim penawaran menarik', New: 'Bangun engagement awal', 'At Risk': 'Kirim diskon win-back', Lost: 'Re-targeting campaign' };
  return { segment: seg, count: group.length, avgRevenue, avgOrders, recommendation: recommendations[seg] || '-', customers: group.slice(0, 10) };
});

const scatterPoints = customers.map((c) => ({ x: c.frequencyScore, y: c.monetaryScore, z: c.recencyScore * 20, segment: c.segment, name: c.name }));

export default function CustomerSegmentsPage() {
  const [selectedSeg, setSelectedSeg] = useState<string | null>(null);
  const detail = selectedSeg ? segmentSummary.find((s) => s.segment === selectedSeg) : null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary font-display">Segmentasi Pelanggan</h2>
        <p className="text-sm text-text-muted mt-1">Analisis RFM (Recency, Frequency, Monetary)</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface rounded-xl border border-dn-border p-5">
          <h3 className="text-base font-bold text-text-primary font-display mb-4">RFM Scatter Plot</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis type="number" dataKey="x" name="Frequency" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} label={{ value: 'Frequency', position: 'bottom', fontSize: 11, fill: 'var(--text-muted)' }} />
                <YAxis type="number" dataKey="y" name="Monetary" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} label={{ value: 'Monetary', angle: -90, position: 'insideLeft', fontSize: 11, fill: 'var(--text-muted)' }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px' }} />
                <Scatter data={scatterPoints}>
                  {scatterPoints.map((p, i) => <Cell key={i} fill={SEGMENT_COLORS[p.segment] || '#999'} />)}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-3 mt-3">
            {segments.map((s) => (
              <span key={s} className="flex items-center gap-1.5 text-xs"><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: SEGMENT_COLORS[s] }} />{s}</span>
            ))}
          </div>
        </div>
        <div className="bg-surface rounded-xl border border-dn-border overflow-hidden">
          <div className="px-5 py-3 border-b border-dn-border bg-background"><h3 className="text-sm font-bold text-text-primary font-display">Ringkasan Segmen</h3></div>
          <table className="w-full text-sm">
            <thead><tr className="text-xs uppercase text-text-muted border-b border-dn-border">
              <th className="px-4 py-2 text-left">Segmen</th><th className="px-4 py-2 text-left">Jumlah</th><th className="px-4 py-2 text-left">Avg Revenue</th><th className="px-4 py-2 text-left">Aksi</th>
            </tr></thead>
            <tbody>
              {segmentSummary.map((s) => (
                <tr key={s.segment} className="border-b border-dn-border/50 hover:bg-surface-hover cursor-pointer" onClick={() => setSelectedSeg(s.segment)}>
                  <td className="px-4 py-2"><span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: SEGMENT_COLORS[s.segment] }} /><span className="font-medium text-text-primary">{s.segment}</span></span></td>
                  <td className="px-4 py-2 font-mono text-text-secondary">{s.count}</td>
                  <td className="px-4 py-2 font-mono text-text-secondary">{formatRp(Math.round(s.avgRevenue))}</td>
                  <td className="px-4 py-2 text-xs text-text-muted">{s.recommendation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {detail && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/30" onClick={() => setSelectedSeg(null)} />
          <div className="relative w-full max-w-md bg-surface h-full overflow-y-auto shadow-2xl border-l border-dn-border animate-slide-right">
            <div className="sticky top-0 bg-surface z-10 flex items-center justify-between p-5 border-b border-dn-border">
              <h3 className="font-display font-bold text-text-primary">Segmen: {detail.segment}</h3>
              <button onClick={() => setSelectedSeg(null)} className="p-2 rounded-lg hover:bg-surface-hover text-text-muted"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-background rounded-lg"><p className="text-xs text-text-muted">Jumlah</p><p className="text-lg font-bold font-mono text-text-primary">{detail.count}</p></div>
                <div className="p-3 bg-background rounded-lg"><p className="text-xs text-text-muted">Avg Revenue</p><p className="text-lg font-bold font-mono text-text-primary">{formatRp(Math.round(detail.avgRevenue))}</p></div>
              </div>
              <div>
                <p className="text-sm font-semibold text-text-secondary mb-2">Top 10 Pelanggan</p>
                {detail.customers.map((c) => (
                  <div key={c.id} className="flex items-center justify-between py-2 border-b border-dn-border/50">
                    <span className="text-sm text-text-primary">{c.name}</span>
                    <span className="text-xs font-mono text-text-muted">{formatRp(c.totalSpend)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
