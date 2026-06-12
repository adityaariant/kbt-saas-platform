'use client';
import { kpiMetrics } from '@/lib/mockData';
import { formatRp } from '@/lib/utils';

export function ExecutiveSummary() {
  const rev = kpiMetrics.find(m => m.label.includes('Pendapatan'))?.value || 0;
  const orders = kpiMetrics.find(m => m.label.includes('Pesanan'))?.value || 0;
  const conv = kpiMetrics.find(m => m.label.includes('Konversi'))?.value || 0;
  
  return (
    <div className="bg-background rounded-lg p-5 border border-dn-border space-y-3">
      <h3 className="font-display font-bold text-text-primary mb-2">Ringkasan Eksekutif</h3>
      <p className="text-sm text-text-secondary leading-relaxed">
        Periode pelaporan ini menunjukkan performa yang kuat dengan total pendapatan mencapai <span className="font-semibold text-text-primary">{formatRp(rev)}</span> dari <span className="font-semibold text-text-primary">{orders}</span> pesanan.
      </p>
      <p className="text-sm text-text-secondary leading-relaxed">
        Tingkat konversi rata-rata berada di angka <span className="font-semibold text-text-primary">{conv}%</span>, yang menunjukkan peningkatan dari periode sebelumnya. Kategori Fashion tetap menjadi penyumbang utama (38.5% dari total penjualan), diikuti oleh Elektronik (29.2%).
      </p>
      <div className="mt-4 pt-4 border-t border-dn-border">
        <h4 className="text-sm font-semibold text-text-primary mb-2">Rekomendasi Utama:</h4>
        <ul className="list-disc list-inside text-sm text-text-secondary space-y-1">
          <li>Fokuskan budget iklan tambahan pada segmen pelanggan &quot;Champions&quot; untuk retensi.</li>
          <li>Optimasi judul listing yang berada di bawah skor 60 berdasarkan hasil Listing Analyzer.</li>
          <li>Siapkan inventori lebih banyak untuk &quot;Kemeja Slim Fit&quot; menghadapi tren permintaan positif minggu depan.</li>
        </ul>
      </div>
    </div>
  );
}
