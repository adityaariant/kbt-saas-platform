'use client';
import { ReportBuilder } from '@/components/modules/reports/ReportBuilder';
import { FileText } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="no-print">
        <h2 className="text-2xl font-bold text-text-primary font-display flex items-center gap-2">
          <FileText className="w-7 h-7 text-primary" /> Laporan & Ekspor
        </h2>
        <p className="text-sm text-text-muted mt-1">Buat dan unduh laporan performa bisnis Anda</p>
      </div>

      <ReportBuilder />
    </div>
  );
}
