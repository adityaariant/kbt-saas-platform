'use client';
import { Check } from 'lucide-react';
import { formatRp } from '@/lib/utils';

export default function BillingSettingsPage() {
  const plans = [
    { name: 'Starter', price: 150000, features: ['1 Toko Terhubung', 'Analitik Dasar', 'Laporan Standar (PDF)', 'Dukungan Email'] },
    { name: 'Pro', price: 450000, features: ['Hingga 5 Toko Terhubung', 'Analitik Lanjutan & Forecasting', 'Laporan Kustom (PDF/CSV)', 'A/B Testing Basic', 'Prioritas Dukungan'] },
    { name: 'Enterprise', price: 1200000, features: ['Toko Tidak Terbatas', 'AI Assistant (Limit 10k)', 'Analitik Konsultan Penuh', 'Akses API', 'Dukungan 24/7 (WhatsApp)'] }
  ];

  const currentPlan = 'Pro';

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h3 className="text-lg font-bold text-text-primary font-display">Paket & Tagihan</h3>
        <p className="text-sm text-text-muted mt-1">Kelola paket langganan dan riwayat pembayaran Anda</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isCurrent = plan.name === currentPlan;
          return (
            <div key={plan.name} className={`relative flex flex-col p-6 rounded-xl border ${isCurrent ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'border-dn-border bg-background'}`}>
              {isCurrent && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-primary text-white text-xs font-bold rounded-full">
                  Paket Saat Ini
                </div>
              )}
              <h4 className="font-display font-bold text-lg text-text-primary mb-2">{plan.name}</h4>
              <div className="mb-6">
                <span className="text-3xl font-bold font-mono text-text-primary">{formatRp(plan.price)}</span>
                <span className="text-sm text-text-muted">/bln</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-sm text-text-secondary">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <button 
                className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isCurrent 
                    ? 'bg-surface border border-dn-border text-text-muted cursor-default' 
                    : 'bg-surface hover:bg-surface-hover text-primary border border-primary/30'
                }`}
                disabled={isCurrent}
              >
                {isCurrent ? 'Aktif' : 'Pilih Paket'}
              </button>
            </div>
          );
        })}
      </div>

      <div className="pt-8 border-t border-dn-border">
        <h4 className="font-display font-bold text-base text-text-primary mb-4">Riwayat Tagihan</h4>
        <div className="border border-dn-border rounded-xl overflow-hidden bg-background">
          <table className="w-full text-sm text-left">
            <thead className="bg-surface border-b border-dn-border">
              <tr>
                <th className="px-5 py-3 text-text-secondary font-semibold">Tanggal</th>
                <th className="px-5 py-3 text-text-secondary font-semibold">Keterangan</th>
                <th className="px-5 py-3 text-text-secondary font-semibold">Jumlah</th>
                <th className="px-5 py-3 text-text-secondary font-semibold">Status</th>
                <th className="px-5 py-3 text-text-secondary font-semibold">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dn-border/50">
              <tr>
                <td className="px-5 py-3 text-text-primary">01 Jun 2025</td>
                <td className="px-5 py-3 text-text-secondary">Langganan Pro (Bulanan)</td>
                <td className="px-5 py-3 font-mono text-text-primary">{formatRp(450000)}</td>
                <td className="px-5 py-3"><span className="px-2 py-1 text-xs font-semibold rounded bg-accent/10 text-accent-dark">Lunas</span></td>
                <td className="px-5 py-3"><a href="#" className="text-primary hover:underline font-medium">Unduh PDF</a></td>
              </tr>
              <tr>
                <td className="px-5 py-3 text-text-primary">01 Mei 2025</td>
                <td className="px-5 py-3 text-text-secondary">Langganan Pro (Bulanan)</td>
                <td className="px-5 py-3 font-mono text-text-primary">{formatRp(450000)}</td>
                <td className="px-5 py-3"><span className="px-2 py-1 text-xs font-semibold rounded bg-accent/10 text-accent-dark">Lunas</span></td>
                <td className="px-5 py-3"><a href="#" className="text-primary hover:underline font-medium">Unduh PDF</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
