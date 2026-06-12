'use client';
import { HeatmapChart } from '@/components/charts/HeatmapChart';
import { salesHeatmap } from '@/lib/mockData';

export function SalesHeatmap() {
  return (
    <div className="bg-surface rounded-xl border border-dn-border p-5">
      <h3 className="text-base font-bold text-text-primary font-display mb-4">Peta Panas Penjualan (Hari × Jam)</h3>
      <HeatmapChart data={salesHeatmap} />
    </div>
  );
}
