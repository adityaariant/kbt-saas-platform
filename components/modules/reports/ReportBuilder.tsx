'use client';
import { useState } from 'react';
import { ExecutiveSummary } from './ExecutiveSummary';
import { kpiMetrics, salesTrends, topProducts } from '@/lib/mockData';
import { Printer, Settings2, FileSpreadsheet, Check } from 'lucide-react';
import { formatRp } from '@/lib/utils';

type ReportModule = 'executive' | 'kpi' | 'trends' | 'products';

export function ReportBuilder() {
  const [selectedModules, setSelectedModules] = useState<Set<ReportModule>>(new Set(['executive', 'kpi', 'trends', 'products']));
  const [dateRange, setDateRange] = useState('Bulan Ini (Juni 2025)');

  const handlePrint = () => window.print();

  const handleExportCSV = () => {
    // Generate simple CSV for top products
    const headers = ['Produk', 'SKU', 'Kategori', 'Terjual', 'Pendapatan'];
    const rows = topProducts.map(p => `"${p.name}","${p.sku}","${p.category}",${p.units},${p.revenue}`);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `laporan_produk_${dateRange.replace(/\s+/g, '_').toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Builder Sidebar (Hidden in Print) */}
      <div className="lg:col-span-1 space-y-6 no-print">
        <div className="bg-surface rounded-xl border border-dn-border p-5">
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-dn-border">
            <Settings2 className="w-5 h-5 text-primary" />
            <h3 className="font-display font-bold text-text-primary">Konfigurasi Laporan</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-text-secondary block mb-2">Periode Data</label>
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-dn-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option>Bulan Ini (Juni 2025)</option>
                <option>Bulan Lalu (Mei 2025)</option>
                <option>Kuartal 2 (Q2 2025)</option>
                <option>Tahun Berjalan (YTD)</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-text-secondary block mb-2">Modul Laporan</label>
              <div className="space-y-2">
                {[
                  { id: 'executive', label: 'Ringkasan Eksekutif' },
                  { id: 'kpi', label: 'Metrik Utama (KPI)' },
                  { id: 'trends', label: 'Tren Pendapatan' },
                  { id: 'products', label: 'Performa Produk' }
                ].map(mod => (
                  <label key={mod.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-hover cursor-pointer border border-transparent hover:border-dn-border transition-all">
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={selectedModules.has(mod.id as ReportModule)}
                      onChange={(e) => {
                        const next = new Set(selectedModules);
                        if (e.target.checked) next.add(mod.id as ReportModule);
                        else if (next.size > 1) next.delete(mod.id as ReportModule);
                        setSelectedModules(next);
                      }} 
                    />
                    <div className={`w-5 h-5 rounded flex items-center justify-center border ${selectedModules.has(mod.id as ReportModule) ? 'bg-primary border-primary text-white' : 'border-dn-border bg-background'}`}>
                      {selectedModules.has(mod.id as ReportModule) && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <span className="text-sm text-text-primary font-medium">{mod.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-dn-border space-y-3">
            <button onClick={handlePrint} className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light transition-colors text-sm">
              <Printer className="w-4 h-4" /> Ekspor ke PDF
            </button>
            <button onClick={handleExportCSV} className="w-full flex items-center justify-center gap-2 py-2.5 bg-surface text-text-primary border border-dn-border font-semibold rounded-lg hover:bg-surface-hover transition-colors text-sm">
              <FileSpreadsheet className="w-4 h-4" /> Ekspor Data CSV
            </button>
          </div>
        </div>
      </div>

      {/* Report Preview (Printable Area) */}
      <div className="lg:col-span-3">
        <div className="bg-surface rounded-xl border border-dn-border p-8 print-area shadow-sm">
          {/* Header */}
          <div className="flex justify-between items-start border-b border-dn-border pb-6 mb-6">
            <div>
              <h1 className="text-3xl font-display font-bold text-text-primary">Laporan Performa Bisnis</h1>
              <p className="text-text-secondary mt-1">Ecommetrics Official Store</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-1">Periode</p>
              <p className="font-mono text-text-primary font-bold">{dateRange}</p>
            </div>
          </div>

          <div className="space-y-10">
            {selectedModules.has('executive') && (
              <section>
                <ExecutiveSummary />
              </section>
            )}

            {selectedModules.has('kpi') && (
              <section>
                <h3 className="font-display font-bold text-lg text-text-primary mb-4 border-b border-dn-border pb-2">Metrik Utama (KPI)</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {kpiMetrics.map(m => (
                    <div key={m.label} className="p-4 border border-dn-border rounded-lg bg-background">
                      <p className="text-xs text-text-muted font-semibold uppercase">{m.label}</p>
                      <p className="text-xl font-bold font-mono text-text-primary mt-1">{m.formattedValue}</p>
                      <span className={`text-xs font-bold ${m.delta >= 0 ? 'text-accent' : 'text-danger'}`}>
                        {m.delta >= 0 ? '+' : ''}{m.delta}% vs bulan lalu
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {selectedModules.has('trends') && (
              <section>
                <h3 className="font-display font-bold text-lg text-text-primary mb-4 border-b border-dn-border pb-2">Data Harian (30 Hari Terakhir)</h3>
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-dn-border">
                      <th className="py-2 text-text-secondary">Hari</th>
                      <th className="py-2 text-text-secondary">Pendapatan</th>
                      <th className="py-2 text-text-secondary">Pesanan</th>
                      <th className="py-2 text-text-secondary">AOV</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dn-border/50">
                    {salesTrends.slice(-10).map((t, i) => (
                      <tr key={i}>
                        <td className="py-2 text-text-primary">{t.date}</td>
                        <td className="py-2 font-mono text-text-secondary">{formatRp(t.sales)}</td>
                        <td className="py-2 font-mono text-text-secondary">{t.orders}</td>
                        <td className="py-2 font-mono text-text-secondary">{formatRp(t.aov)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-xs text-text-muted mt-2 italic">*Hanya menampilkan 10 hari terakhir untuk pratinjau</p>
              </section>
            )}

            {selectedModules.has('products') && (
              <section>
                <h3 className="font-display font-bold text-lg text-text-primary mb-4 border-b border-dn-border pb-2">Produk Terlaris</h3>
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-dn-border">
                      <th className="py-2 text-text-secondary">Produk</th>
                      <th className="py-2 text-text-secondary">SKU</th>
                      <th className="py-2 text-text-secondary text-right">Terjual</th>
                      <th className="py-2 text-text-secondary text-right">Pendapatan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dn-border/50">
                    {topProducts.slice(0, 5).map((p) => (
                      <tr key={p.id}>
                        <td className="py-2 font-medium text-text-primary">{p.name}</td>
                        <td className="py-2 font-mono text-xs text-text-muted">{p.sku}</td>
                        <td className="py-2 text-right font-mono text-text-secondary">{p.units.toLocaleString('id-ID')}</td>
                        <td className="py-2 text-right font-mono font-medium text-text-primary">{formatRp(p.revenue)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            )}
          </div>

          <div className="mt-12 pt-6 border-t border-dn-border text-center no-print">
            <p className="text-sm text-text-muted">
              Ini adalah pratinjau langsung. Saat diekspor ke PDF, sidebar dan elemen navigasi tidak akan dicetak.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
