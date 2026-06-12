'use client';
import { useState } from 'react';
import { ElasticityChart } from '@/components/charts/ElasticityChart';
import { elasticityData, products } from '@/lib/mockData';
import { DollarSign, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { formatRp } from '@/lib/utils';

export default function PriceElasticityPage() {
  const [product, setProduct] = useState(products[0].id);

  // Calculate some insights based on the mock elasticity data
  const maxRevenuePoint = elasticityData.reduce((max, point) => {
    const rev = point.price * point.demand;
    return rev > (max.price * max.demand) ? point : max;
  }, elasticityData[0]);

  const currentPrice = elasticityData[4].price;
  const currentDemand = elasticityData[4].demand;
  const currentRevenue = currentPrice * currentDemand;
  const maxRevenue = maxRevenuePoint.price * maxRevenuePoint.demand;
  
  const potentialUplift = ((maxRevenue - currentRevenue) / currentRevenue) * 100;
  
  // Calculate price elasticity of demand (PED)
  // PED = (% change in quantity) / (% change in price)
  const p1 = elasticityData[3];
  const p2 = elasticityData[5];
  const pctChangeQuantity = ((p2.demand - p1.demand) / p1.demand);
  const pctChangePrice = ((p2.price - p1.price) / p1.price);
  const ped = Math.abs(pctChangeQuantity / pctChangePrice).toFixed(2);
  
  const isElastic = parseFloat(ped) > 1;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary font-display flex items-center gap-2">
          <DollarSign className="w-7 h-7 text-primary" /> Elastisitas Harga
        </h2>
        <p className="text-sm text-text-muted mt-1">Temukan harga optimal untuk memaksimalkan pendapatan</p>
      </div>

      <div className="flex gap-3">
        <select 
          value={product} 
          onChange={(e) => setProduct(e.target.value)} 
          className="px-3 py-2 text-sm border border-dn-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 min-w-[250px]"
        >
          {products.slice(0, 10).map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface rounded-xl border border-dn-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-text-primary font-display">Kurva Permintaan vs Harga</h3>
            <span className="text-xs px-2 py-1 bg-background text-text-secondary rounded border border-dn-border font-mono">
              R² = 0.89
            </span>
          </div>
          <ElasticityChart data={elasticityData} />
          <p className="text-xs text-text-muted text-center mt-2">
            Tip: Arahkan kursor ke titik grafik untuk melihat estimasi pendapatan.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-surface rounded-xl border border-dn-border p-5">
            <h3 className="text-sm font-bold text-text-primary font-display mb-4">Analisis Elastisitas</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-dn-border/50">
                <span className="text-sm text-text-secondary">Koefisien Elastisitas (PED)</span>
                <span className={`text-lg font-bold font-mono ${isElastic ? 'text-danger' : 'text-accent'}`}>{ped}</span>
              </div>
              
              <div className="pb-3 border-b border-dn-border/50">
                <span className="text-sm text-text-secondary block mb-1">Status Produk</span>
                <div className="flex items-center gap-2">
                  {isElastic ? (
                    <><TrendingDown className="w-4 h-4 text-danger" /><span className="text-sm font-semibold text-text-primary">Elastis (Sensitif Harga)</span></>
                  ) : (
                    <><TrendingUp className="w-4 h-4 text-accent" /><span className="text-sm font-semibold text-text-primary">Inelastis (Kebal Harga)</span></>
                  )}
                </div>
              </div>

              <div className="p-3 bg-info/10 border border-info/30 rounded-lg">
                <p className="text-sm text-text-secondary flex gap-2 items-start">
                  <AlertCircle className="w-4 h-4 text-info shrink-0 mt-0.5" />
                  <span>
                    Karena PED <strong>{isElastic ? '> 1' : '< 1'}</strong>, penurunan harga {isElastic ? 'akan' : 'TIDAK akan'} meningkatkan total pendapatan secara proporsional.
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-xl border border-dn-border p-5 border-l-4 border-l-accent">
            <h3 className="text-sm font-bold text-text-primary font-display mb-4">Rekomendasi Harga Optimal</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-text-muted">Harga Saat Ini</span>
                <span className="text-sm font-mono font-medium text-text-secondary">{formatRp(currentPrice)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-text-muted">Harga Optimal (Est.)</span>
                <span className="text-lg font-mono font-bold text-accent">{formatRp(maxRevenuePoint.price)}</span>
              </div>
              
              <div className="pt-3 border-t border-dn-border mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-text-primary">Potensi Kenaikan Pendapatan</span>
                  <span className="text-sm font-bold text-accent font-mono">+{potentialUplift.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
