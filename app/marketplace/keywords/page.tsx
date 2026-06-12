'use client';
import { useState, useMemo } from 'react';
import { keywords } from '@/lib/mockData';
import { Search, Plus, ArrowUpDown } from 'lucide-react';
import { SparklineChart } from '@/components/charts/SparklineChart';
import { cn } from '@/lib/utils';

const COMP_COLORS = { low: 'bg-accent/15 text-accent-dark', medium: 'bg-warning/15 text-warning', high: 'bg-danger/15 text-danger' };

export default function KeywordsPage() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<'volume' | 'opportunityScore'>('volume');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [showModal, setShowModal] = useState(false);
  const [newKw, setNewKw] = useState('');
  const [extra, setExtra] = useState<typeof keywords>([]);

  const filtered = useMemo(() => {
    let data = [...keywords, ...extra];
    if (search) data = data.filter((k) => k.keyword.toLowerCase().includes(search.toLowerCase()));
    data.sort((a, b) => sortDir === 'asc' ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey]);
    return data;
  }, [search, sortKey, sortDir, extra]);

  const toggleSort = (key: 'volume' | 'opportunityScore') => {
    if (sortKey === key) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  const addKeyword = () => {
    if (!newKw.trim()) return;
    extra.push({ keyword: newKw.trim(), volume: Math.floor(Math.random() * 50000) + 5000, competition: 'medium', yourRank: null, opportunityScore: Math.floor(Math.random() * 80) + 20, trend: Array.from({ length: 7 }, () => Math.floor(Math.random() * 20000) + 5000) });
    setExtra([...extra]);
    setNewKw('');
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary font-display">Riset Keyword</h2>
          <p className="text-sm text-text-muted mt-1">Lacak dan temukan keyword potensial untuk listing Anda</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-light transition-colors">
          <Plus className="w-4 h-4" /> Tambah Keyword
        </button>
      </div>
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari keyword..." className="pl-9 pr-3 py-2 w-full text-sm border border-dn-border rounded-lg bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30" />
      </div>
      <div className="bg-surface rounded-xl border border-dn-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-text-muted border-b border-dn-border bg-background">
                <th className="px-5 py-3 text-left font-semibold">Keyword</th>
                <th className="px-5 py-3 text-left font-semibold cursor-pointer" onClick={() => toggleSort('volume')}><span className="flex items-center gap-1">Volume <ArrowUpDown className="w-3 h-3" /></span></th>
                <th className="px-5 py-3 text-left font-semibold">Kompetisi</th>
                <th className="px-5 py-3 text-left font-semibold">Peringkat Anda</th>
                <th className="px-5 py-3 text-left font-semibold cursor-pointer" onClick={() => toggleSort('opportunityScore')}><span className="flex items-center gap-1">Peluang <ArrowUpDown className="w-3 h-3" /></span></th>
                <th className="px-5 py-3 text-left font-semibold">Tren 7H</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 25).map((kw, i) => (
                <tr key={i} className="border-b border-dn-border/50 hover:bg-surface-hover transition-colors">
                  <td className="px-5 py-3 font-medium text-text-primary">{kw.keyword}</td>
                  <td className="px-5 py-3 font-mono text-text-secondary">{kw.volume.toLocaleString('id-ID')}</td>
                  <td className="px-5 py-3"><span className={cn('text-xs font-bold px-2 py-0.5 rounded-full', COMP_COLORS[kw.competition])}>{kw.competition}</span></td>
                  <td className="px-5 py-3 font-mono text-text-secondary">{kw.yourRank ? `#${kw.yourRank}` : <span className="text-text-muted">—</span>}</td>
                  <td className="px-5 py-3"><div className="flex items-center gap-2"><div className="w-12 h-1.5 bg-background rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full" style={{ width: `${kw.opportunityScore}%` }} /></div><span className="text-xs font-mono text-text-muted">{kw.opportunityScore}</span></div></td>
                  <td className="px-5 py-3"><SparklineChart data={kw.trend} positive={kw.trend[6] > kw.trend[0]} width={64} height={24} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-surface rounded-xl border border-dn-border p-6 w-96 shadow-2xl animate-fade-in">
            <h3 className="font-display font-bold text-text-primary mb-4">Tambah Keyword Baru</h3>
            <input value={newKw} onChange={(e) => setNewKw(e.target.value)} placeholder="Masukkan keyword..." className="w-full px-3 py-2 text-sm border border-dn-border rounded-lg bg-background text-text-primary mb-4 focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <div className="flex gap-2">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 text-sm font-semibold text-text-secondary border border-dn-border rounded-lg hover:bg-surface-hover">Batal</button>
              <button onClick={addKeyword} className="flex-1 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-light">Tambah</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
