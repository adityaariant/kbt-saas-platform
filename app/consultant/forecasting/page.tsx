'use client';
import { useState } from 'react';
import { ForecastChart } from '@/components/charts/ForecastChart';
import { forecastData, products } from '@/lib/mockData';
import { formatRp } from '@/lib/utils';

export default function ForecastingPage() {
  const [product, setProduct] = useState(products[0].id);
  const [horizon, setHorizon] = useState('90');

  const futureWeeks = forecastData.filter((d) => d.actual === null);
  const mae = 342000; const rmse = 456000; const mape = 7.2;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary font-display">Sales Forecasting</h2>
        <p className="text-sm text-text-muted mt-1">Prediksi penjualan berdasarkan pola historis</p>
      </div>
      <div className="flex gap-3 flex-wrap">
        <select value={product} onChange={(e) => setProduct(e.target.value)} className="px-3 py-2 text-sm border border-dn-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30">
          {products.slice(0, 10).map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <select value={horizon} onChange={(e) => setHorizon(e.target.value)} className="px-3 py-2 text-sm border border-dn-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30">
          <option value="30">30 Hari</option>
          <option value="60">60 Hari</option>
          <option value="90">90 Hari</option>
        </select>
      </div>
      <div className="bg-surface rounded-xl border border-dn-border p-5">
        <h3 className="text-base font-bold text-text-primary font-display mb-4">Grafik Prediksi</h3>
        <ForecastChart data={forecastData} />
        <div className="flex gap-4 mt-3 text-xs text-text-muted">
          <span className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-primary inline-block" /> Aktual</span>
          <span className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-primary inline-block" style={{ borderTop: '2px dashed var(--color-primary)' }} /> Prediksi</span>
          <span className="flex items-center gap-1.5"><span className="w-4 h-3 bg-primary/10 inline-block rounded" /> Confidence Band</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[{ label: 'MAE', value: formatRp(mae) }, { label: 'RMSE', value: formatRp(rmse) }, { label: 'MAPE', value: `${mape}%` }].map((m) => (
          <div key={m.label} className="bg-surface rounded-xl border border-dn-border p-4 text-center">
            <p className="text-xs font-semibold text-text-muted uppercase">{m.label}</p>
            <p className="text-xl font-bold text-text-primary font-mono mt-1">{m.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-surface rounded-xl border border-dn-border overflow-hidden">
        <div className="px-5 py-3 border-b border-dn-border bg-background"><h3 className="text-sm font-bold text-text-primary font-display">Prediksi Mingguan</h3></div>
        <table className="w-full text-sm">
          <thead><tr className="text-xs uppercase text-text-muted border-b border-dn-border">
            <th className="px-5 py-2 text-left">Minggu</th><th className="px-5 py-2 text-left">Prediksi</th><th className="px-5 py-2 text-left">Batas Bawah</th><th className="px-5 py-2 text-left">Batas Atas</th>
          </tr></thead>
          <tbody>
            {futureWeeks.map((w) => (
              <tr key={w.week} className="border-b border-dn-border/50 hover:bg-surface-hover">
                <td className="px-5 py-2 font-medium text-text-primary">{w.week}</td>
                <td className="px-5 py-2 font-mono text-text-secondary">{formatRp(w.forecast)}</td>
                <td className="px-5 py-2 font-mono text-text-muted">{formatRp(w.lower)}</td>
                <td className="px-5 py-2 font-mono text-text-muted">{formatRp(w.upper)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
