'use client';
import { CohortTable } from '@/components/charts/CohortTable';
import { cohortData } from '@/lib/mockData';
import { Grid3x3 } from 'lucide-react';

export default function CohortAnalysisPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary font-display flex items-center gap-2">
          <Grid3x3 className="w-7 h-7 text-primary" /> Cohort Analysis
        </h2>
        <p className="text-sm text-text-muted mt-1">Retensi pelanggan berdasarkan bulan akuisisi</p>
      </div>

      <div className="bg-surface rounded-xl border border-dn-border p-5 lg:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h3 className="text-base font-bold text-text-primary font-display">Tingkat Retensi (Persentase)</h3>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-[#00C49A] rounded-sm opacity-20"></span>0-20%</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-[#00C49A] rounded-sm opacity-50"></span>21-50%</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-[#00C49A] rounded-sm opacity-80"></span>51-80%</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-[#00C49A] rounded-sm"></span>81-100%</span>
          </div>
        </div>

        <div className="border border-dn-border rounded-lg overflow-hidden">
          <CohortTable data={cohortData} />
        </div>

        <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-2">
          <p className="text-sm font-semibold text-primary">💡 Insight Kohort</p>
          <ul className="text-sm text-text-secondary list-disc list-inside space-y-1">
            <li>Kohort <span className="font-medium text-text-primary">Nov 2025</span> menunjukkan retensi yang sangat kuat di bulan ke-2 (62%), kemungkinan efek dari promo akhir tahun.</li>
            <li>Ada penurunan drastis pada retensi bulan ke-1 untuk kohort <span className="font-medium text-text-primary">Feb 2026</span> (hanya 35%). Perlu evaluasi kualitas produk atau target audiens pada periode tersebut.</li>
            <li>Rata-rata pelanggan stabil setelah bulan ke-3 di angka ~20%. Pertimbangkan program loyalitas untuk mempertahankan mereka.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
