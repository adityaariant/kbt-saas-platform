'use client';
import { useState } from 'react';
import { FileSearch } from 'lucide-react';

const TRIGGER_WORDS = ['promo', 'murah', 'gratis', 'terbaik', 'ori', 'original', 'diskon', 'sale'];
const SPEC_WORDS = ['100%', 'cm', 'ml', 'gram', 'hitam', 'putih', 'merah', 'biru', 'katun', 'kulit', 'premium'];

function scoreTitle(title: string): { total: number; breakdown: { label: string; score: number; max: number; feedback: string }[] } {
  const len = title.length;
  const lenScore = len >= 60 && len <= 80 ? 20 : len >= 40 && len < 60 ? 15 : len > 80 ? 12 : 8;
  const kwScore = title.toLowerCase().split(' ').length >= 5 ? 20 : 12;
  const emotionalScore = TRIGGER_WORDS.some((w) => title.toLowerCase().includes(w)) ? 20 : 8;
  const specScore = SPEC_WORDS.some((w) => title.toLowerCase().includes(w)) ? 20 : 6;
  const capsRatio = (title.replace(/[^A-Z]/g, '').length) / (title.length || 1);
  const readScore = capsRatio > 0.2 ? 8 : 20;
  const total = lenScore + kwScore + emotionalScore + specScore + readScore;
  return {
    total,
    breakdown: [
      { label: 'Panjang Judul', score: lenScore, max: 20, feedback: len >= 60 && len <= 80 ? 'Optimal (60-80 karakter)' : `${len} karakter — targetkan 60-80` },
      { label: 'Kepadatan Keyword', score: kwScore, max: 20, feedback: kwScore >= 20 ? 'Cukup keyword' : 'Tambahkan lebih banyak keyword relevan' },
      { label: 'Pemicu Emosional', score: emotionalScore, max: 20, feedback: emotionalScore >= 20 ? 'Ditemukan kata pemicu' : 'Tambahkan kata seperti "promo", "terbaik"' },
      { label: 'Spesifisitas', score: specScore, max: 20, feedback: specScore >= 20 ? 'Ada detail spesifik' : 'Tambahkan ukuran, warna, atau bahan' },
      { label: 'Keterbacaan', score: readScore, max: 20, feedback: readScore >= 20 ? 'Format baik' : 'Kurangi penggunaan huruf kapital' },
    ],
  };
}

export default function ListingAnalyzerPage() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [result, setResult] = useState<ReturnType<typeof scoreTitle> | null>(null);

  const handleAnalyze = () => { if (title.trim()) setResult(scoreTitle(title)); };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary font-display flex items-center gap-2"><FileSearch className="w-7 h-7 text-primary" /> Listing Analyzer</h2>
        <p className="text-sm text-text-muted mt-1">Analisis dan optimasi judul produk marketplace Anda</p>
      </div>

      <div className="bg-surface rounded-xl border border-dn-border p-5 space-y-4">
        <div>
          <label className="text-sm font-semibold text-text-secondary block mb-1.5">Judul Produk</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Masukkan judul produk Anda..." className="w-full px-4 py-2.5 border border-dn-border rounded-lg bg-background text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm" />
        </div>
        <div>
          <label className="text-sm font-semibold text-text-secondary block mb-1.5">Deskripsi Produk (opsional)</label>
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={4} placeholder="Masukkan deskripsi produk..." className="w-full px-4 py-2.5 border border-dn-border rounded-lg bg-background text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm resize-none" />
        </div>
        <button onClick={handleAnalyze} className="px-6 py-2.5 bg-primary hover:bg-primary-light text-white font-semibold rounded-lg transition-colors text-sm">Analisis Sekarang</button>
      </div>

      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-surface rounded-xl border border-dn-border p-6 flex flex-col items-center justify-center">
            <svg viewBox="0 0 120 120" className="w-32 h-32">
              <circle cx="60" cy="60" r="50" fill="none" stroke="var(--border)" strokeWidth="8" />
              <circle cx="60" cy="60" r="50" fill="none" stroke={result.total >= 80 ? '#00C49A' : result.total >= 60 ? '#F59E0B' : '#EF4444'} strokeWidth="8" strokeLinecap="round" strokeDasharray={`${(result.total / 100) * 314} 314`} transform="rotate(-90 60 60)" />
              <text x="60" y="55" textAnchor="middle" className="text-2xl font-bold" fill="var(--text-primary)" fontSize="28">{result.total}</text>
              <text x="60" y="75" textAnchor="middle" fill="var(--text-muted)" fontSize="12">/100</text>
            </svg>
            <p className="mt-2 text-sm font-semibold text-text-secondary">
              {result.total >= 80 ? '🎉 Sangat Baik!' : result.total >= 60 ? '⚡ Perlu Perbaikan' : '⚠️ Butuh Optimasi'}
            </p>
          </div>
          <div className="lg:col-span-2 bg-surface rounded-xl border border-dn-border overflow-hidden">
            <div className="px-5 py-3 border-b border-dn-border bg-background"><h3 className="text-sm font-bold text-text-primary font-display">Detail Skor</h3></div>
            <table className="w-full text-sm">
              <tbody>
                {result.breakdown.map((item) => (
                  <tr key={item.label} className="border-b border-dn-border/50">
                    <td className="px-5 py-3 font-medium text-text-primary">{item.label}</td>
                    <td className="px-5 py-3"><div className="flex items-center gap-2"><div className="w-20 h-2 bg-background rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full" style={{ width: `${(item.score / item.max) * 100}%` }} /></div><span className="text-xs font-mono text-text-muted">{item.score}/{item.max}</span></div></td>
                    <td className="px-5 py-3 text-xs text-text-muted">{item.feedback}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
