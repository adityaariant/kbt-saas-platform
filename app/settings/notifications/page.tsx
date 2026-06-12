'use client';
import { useState } from 'react';
import { BellRing, Mail, Smartphone } from 'lucide-react';

export default function NotificationsSettingsPage() {
  const [preferences, setPreferences] = useState({
    stockAlerts: true,
    salesMilestones: true,
    competitorPrice: false,
    dailySummary: true,
    weeklyReport: true
  });

  const togglePref = (key: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h3 className="text-lg font-bold text-text-primary font-display">Pengaturan Notifikasi</h3>
        <p className="text-sm text-text-muted mt-1">Pilih notifikasi yang ingin Anda terima</p>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-bold text-text-primary mb-4 flex items-center gap-2 border-b border-dn-border pb-2">
            <BellRing className="w-4 h-4 text-primary" /> Notifikasi Sistem (In-App)
          </h4>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-lg border border-dn-border bg-background cursor-pointer hover:border-primary/50">
              <div>
                <p className="text-sm font-semibold text-text-primary">Peringatan Stok Tipis</p>
                <p className="text-xs text-text-muted mt-0.5">Beritahu ketika stok produk di bawah 10 unit</p>
              </div>
              <div className={`w-10 h-5 rounded-full relative transition-colors ${preferences.stockAlerts ? 'bg-primary' : 'bg-dn-border'}`} onClick={() => togglePref('stockAlerts')}>
                <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${preferences.stockAlerts ? 'left-5.5' : 'left-0.5'}`} />
              </div>
            </label>
            <label className="flex items-center justify-between p-3 rounded-lg border border-dn-border bg-background cursor-pointer hover:border-primary/50">
              <div>
                <p className="text-sm font-semibold text-text-primary">Pencapaian Penjualan</p>
                <p className="text-xs text-text-muted mt-0.5">Notifikasi saat mencapai target penjualan harian/bulanan</p>
              </div>
              <div className={`w-10 h-5 rounded-full relative transition-colors ${preferences.salesMilestones ? 'bg-primary' : 'bg-dn-border'}`} onClick={() => togglePref('salesMilestones')}>
                <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${preferences.salesMilestones ? 'left-5.5' : 'left-0.5'}`} />
              </div>
            </label>
            <label className="flex items-center justify-between p-3 rounded-lg border border-dn-border bg-background cursor-pointer hover:border-primary/50">
              <div>
                <p className="text-sm font-semibold text-text-primary">Perubahan Harga Kompetitor</p>
                <p className="text-xs text-text-muted mt-0.5">Beritahu saat kompetitor di pantauan mengubah harga</p>
              </div>
              <div className={`w-10 h-5 rounded-full relative transition-colors ${preferences.competitorPrice ? 'bg-primary' : 'bg-dn-border'}`} onClick={() => togglePref('competitorPrice')}>
                <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${preferences.competitorPrice ? 'left-5.5' : 'left-0.5'}`} />
              </div>
            </label>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-text-primary mb-4 flex items-center gap-2 border-b border-dn-border pb-2">
            <Mail className="w-4 h-4 text-primary" /> Laporan Email
          </h4>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-lg border border-dn-border bg-background cursor-pointer hover:border-primary/50">
              <div>
                <p className="text-sm font-semibold text-text-primary">Ringkasan Harian</p>
                <p className="text-xs text-text-muted mt-0.5">Dikirim setiap pagi jam 08:00 WIB</p>
              </div>
              <div className={`w-10 h-5 rounded-full relative transition-colors ${preferences.dailySummary ? 'bg-primary' : 'bg-dn-border'}`} onClick={() => togglePref('dailySummary')}>
                <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${preferences.dailySummary ? 'left-5.5' : 'left-0.5'}`} />
              </div>
            </label>
            <label className="flex items-center justify-between p-3 rounded-lg border border-dn-border bg-background cursor-pointer hover:border-primary/50">
              <div>
                <p className="text-sm font-semibold text-text-primary">Laporan Kinerja Mingguan</p>
                <p className="text-xs text-text-muted mt-0.5">Dikirim setiap hari Senin pagi</p>
              </div>
              <div className={`w-10 h-5 rounded-full relative transition-colors ${preferences.weeklyReport ? 'bg-primary' : 'bg-dn-border'}`} onClick={() => togglePref('weeklyReport')}>
                <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${preferences.weeklyReport ? 'left-5.5' : 'left-0.5'}`} />
              </div>
            </label>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-text-primary mb-4 flex items-center gap-2 border-b border-dn-border pb-2 text-text-muted">
            <Smartphone className="w-4 h-4" /> Push Notifications (Akan Datang)
          </h4>
          <p className="text-sm text-text-muted italic">Fitur notifikasi ke perangkat mobile sedang dalam pengembangan.</p>
        </div>
      </div>
    </div>
  );
}
