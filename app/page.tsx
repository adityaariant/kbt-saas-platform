'use client';

import { useState } from 'react';
import { kpiMetrics } from '@/lib/mockData';
import { KpiCard } from '@/components/modules/dashboard/KpiCard';
import { RevenueChart } from '@/components/modules/dashboard/RevenueChart';
import { TopProductsTable } from '@/components/modules/dashboard/TopProductsTable';
import { ProductDetailDrawer } from '@/components/modules/dashboard/ProductDetailDrawer';
import { RevenueBreakdown } from '@/components/modules/dashboard/RevenueBreakdown';
import { SalesHeatmap } from '@/components/modules/dashboard/SalesHeatmap';
import { GoalTracker } from '@/components/modules/dashboard/GoalTracker';

interface ProductData {
  id: number; name: string; sku: string; category: string;
  units: number; revenue: number; trend: number[];
}

export default function DashboardPage() {
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary font-display">Dashboard Penjualan</h2>
          <p className="text-sm text-text-muted mt-1">Ringkasan performa toko Anda bulan ini</p>
        </div>
        <span className="hidden sm:inline-flex text-xs font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-full">Bulan Ini</span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpiMetrics.map((metric, idx) => (
          <KpiCard key={metric.label} metric={metric} index={idx} />
        ))}
      </div>

      {/* Revenue Chart */}
      <RevenueChart />

      {/* Table + Drawer */}
      <TopProductsTable onRowClick={(p) => setSelectedProduct(p as ProductData)} />
      <ProductDetailDrawer product={selectedProduct} onClose={() => setSelectedProduct(null)} />

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueBreakdown />
        <GoalTracker />
      </div>

      {/* Heatmap */}
      <SalesHeatmap />
    </div>
  );
}