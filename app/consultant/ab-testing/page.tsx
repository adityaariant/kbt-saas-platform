'use client';
import { useState } from 'react';
import { NormalCurveChart } from '@/components/charts/NormalCurveChart';
import { FlaskConical, Plus } from 'lucide-react';
import { formatNumber } from '@/lib/utils';

export default function AbTestingPage() {
  const [showModal, setShowModal] = useState(false);

  const activeTest = {
    name: 'Deskripsi Produk V2',
    status: 'running',
    daysLeft: 3,
    variantA: { name: 'Asli', traffic: 1540, conversions: 42, rate: 2.7 },
    variantB: { name: 'V2 (Emosional)', traffic: 1565, conversions: 58, rate: 3.7 },
    significance: 0.08, // p-value
  };

  const completedTests = [
    {
      id: 1,
      name: 'Tombol Beli Warna Merah vs Biru',
      result: 'Varian B (Biru) Menang',
      uplift: '+12.5%',
      pvalue: 0.034,
      date: '10 Jun 2025'
    },
    {
      id: 2,
      name: 'Judul Pendek vs Panjang',
      result: 'Tidak Signifikan',
      uplift: '+1.2%',
      pvalue: 0.45,
      date: '28 Mei 2025'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary font-display flex items-center gap-2">
            <FlaskConical className="w-7 h-7 text-primary" /> A/B Testing
          </h2>
          <p className="text-sm text-text-muted mt-1">Uji variasi listing untuk konversi maksimal</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-light transition-colors"
        >
          <Plus className="w-4 h-4" /> Buat Test Baru
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface rounded-xl border border-dn-border p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-text-primary font-display">Test Berjalan: {activeTest.name}</h3>
              <span className="text-xs px-2 py-1 bg-warning/10 text-warning font-semibold rounded-full border border-warning/20">
                Sisa {activeTest.daysLeft} Hari
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-background rounded-xl border border-dn-border">
                <p className="text-sm font-semibold text-text-secondary mb-2">{activeTest.variantA.name}</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-2xl font-bold text-text-primary font-mono">{activeTest.variantA.rate}%</p>
                    <p className="text-xs text-text-muted mt-1">Konversi</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono text-text-secondary">{formatNumber(activeTest.variantA.conversions)}</p>
                    <p className="text-xs text-text-muted mt-1">dari {formatNumber(activeTest.variantA.traffic)} visit</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                <p className="text-sm font-semibold text-primary mb-2">{activeTest.variantB.name}</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-2xl font-bold text-text-primary font-mono">{activeTest.variantB.rate}%</p>
                    <p className="text-xs text-text-muted mt-1">Konversi</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono text-text-secondary">{formatNumber(activeTest.variantB.conversions)}</p>
                    <p className="text-xs text-text-muted mt-1">dari {formatNumber(activeTest.variantB.traffic)} visit</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-background rounded-xl p-4 border border-dn-border">
              <NormalCurveChart
                meanA={activeTest.variantA.rate}
                meanB={activeTest.variantB.rate}
                label="Distribusi Tingkat Konversi"
              />
            </div>
            
            <div className="mt-4 p-3 bg-info/10 border border-info/30 rounded-lg text-sm text-text-secondary flex gap-2 items-start">
              <span className="text-info mt-0.5">ℹ️</span>
              <p>P-Value saat ini: <strong>{activeTest.significance}</strong>. Perlu mencapai &lt; 0.05 untuk signifikansi statistik. Biarkan test berjalan hingga selesai.</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-surface rounded-xl border border-dn-border overflow-hidden">
            <div className="px-5 py-4 border-b border-dn-border bg-background">
              <h3 className="text-base font-bold text-text-primary font-display">Riwayat Test</h3>
            </div>
            <div className="divide-y divide-dn-border">
              {completedTests.map((t) => (
                <div key={t.id} className="p-4 hover:bg-surface-hover transition-colors">
                  <p className="font-semibold text-text-primary text-sm mb-1">{t.name}</p>
                  <p className="text-xs text-text-muted mb-2">{t.date}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${t.pvalue < 0.05 ? 'bg-accent/10 border-accent/20 text-accent-dark' : 'bg-background border-dn-border text-text-secondary'}`}>
                      {t.result}
                    </span>
                    {t.pvalue < 0.05 && <span className="text-sm font-bold text-accent font-mono">{t.uplift}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-surface rounded-xl border border-dn-border p-6 w-[480px] shadow-2xl animate-fade-in">
            <h3 className="font-display font-bold text-text-primary mb-1">Buat A/B Test Baru</h3>
            <p className="text-sm text-text-muted mb-4">Mulai eksperimen untuk listing Anda</p>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm font-semibold text-text-secondary block mb-1.5">Nama Test</label>
                <input placeholder="Contoh: Optimasi Judul Kemeja" className="w-full px-3 py-2 text-sm border border-dn-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-semibold text-text-secondary block mb-1.5">Durasi (Hari)</label>
                  <input type="number" defaultValue="7" className="w-full px-3 py-2 text-sm border border-dn-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-text-secondary block mb-1.5">Metrik Target</label>
                  <select className="w-full px-3 py-2 text-sm border border-dn-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30">
                    <option>Konversi (Pesanan)</option>
                    <option>Klik (CTR)</option>
                    <option>Pendapatan</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 text-sm font-semibold text-text-secondary border border-dn-border rounded-lg hover:bg-surface-hover transition-colors">Batal</button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-light transition-colors">Mulai Eksperimen</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
