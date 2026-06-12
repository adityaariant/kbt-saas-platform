'use client';
import { useState } from 'react';
import { DonutChart } from '@/components/charts/DonutChart';

const categoryData = [
  { name: 'Fashion', value: 38500000, color: '#0F4C81' },
  { name: 'Elektronik', value: 29200000, color: '#00C49A' },
  { name: 'Rumah Tangga', value: 18700000, color: '#F59E0B' },
  { name: 'Kecantikan', value: 14100000, color: '#8B5CF6' },
];

const platformData = [
  { name: 'Shopee', value: 42000000, color: '#EE4D2D' },
  { name: 'Tokopedia', value: 35500000, color: '#42B549' },
  { name: 'Lazada', value: 23000000, color: '#0F146D' },
];

type Tab = 'category' | 'platform';

export function RevenueBreakdown() {
  const [tab, setTab] = useState<Tab>('category');

  return (
    <div className="bg-surface rounded-xl border border-dn-border p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-bold text-text-primary font-display">Breakdown Pendapatan</h3>
        <div className="flex gap-1 bg-background rounded-lg p-1">
          {([{ key: 'category', label: 'Per Kategori' }, { key: 'platform', label: 'Per Platform' }] as const).map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)} className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${tab === t.key ? 'bg-primary text-white' : 'text-text-muted hover:text-text-primary'}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <DonutChart data={tab === 'category' ? categoryData : platformData} />
    </div>
  );
}
