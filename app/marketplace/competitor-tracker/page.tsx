'use client';
import { useState } from 'react';
import { competitors } from '@/lib/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Plus, AlertTriangle, Users } from 'lucide-react';

const priceGapData = [
  { category: 'Fashion', you: 145000, 'TokoMaju Digital': 125000, 'FashionHub Co': 155000 },
  { category: 'Elektronik', you: 210000, 'GadgetZone Store': 185000, 'TokoMaju Digital': 195000 },
  { category: 'Rumah Tangga', you: 95000, 'HomeStyle Official': 89000, 'GadgetZone Store': 92000 },
  { category: 'Kecantikan', you: 82000, 'BeautyLab ID': 75000, 'HomeStyle Official': 80000 },
];

const theirKeywords = ['laptop stand aluminium', 'charger type c fast', 'ring light 26cm', 'action camera 4k murah', 'speaker jbl mini', 'wireless charger pad'];

export default function CompetitorTrackerPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary font-display flex items-center gap-2"><Users className="w-7 h-7 text-primary" /> Pelacak Kompetitor</h2>
          <p className="text-sm text-text-muted mt-1">Pantau dan analisis strategi kompetitor Anda</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-light transition-colors"><Plus className="w-4 h-4" /> Tambah Kompetitor</button>
      </div>

      <div className="bg-surface rounded-xl border border-dn-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-xs uppercase tracking-wider text-text-muted border-b border-dn-border bg-background">
              <th className="px-5 py-3 text-left font-semibold">Nama Toko</th>
              <th className="px-5 py-3 text-left font-semibold">Platform</th>
              <th className="px-5 py-3 text-left font-semibold">Produk</th>
              <th className="px-5 py-3 text-left font-semibold">Harga Rata-rata</th>
              <th className="px-5 py-3 text-left font-semibold">Rating</th>
              <th className="px-5 py-3 text-left font-semibold">Top Keywords</th>
            </tr></thead>
            <tbody>
              {competitors.map((c) => (
                <tr key={c.id} className="border-b border-dn-border/50 hover:bg-surface-hover">
                  <td className="px-5 py-3 font-semibold text-text-primary">{c.name}</td>
                  <td className="px-5 py-3"><span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">{c.platform}</span></td>
                  <td className="px-5 py-3 font-mono text-text-secondary">{c.productCount}</td>
                  <td className="px-5 py-3 font-mono text-text-secondary">Rp {c.avgPrice.toLocaleString('id-ID')}</td>
                  <td className="px-5 py-3 font-mono text-text-secondary">⭐ {c.rating}</td>
                  <td className="px-5 py-3"><div className="flex flex-wrap gap-1">{c.topKeywords.slice(0, 2).map((k) => (<span key={k} className="text-xs px-2 py-0.5 bg-background rounded-full text-text-muted">{k}</span>))}</div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-dn-border p-5">
        <h3 className="text-base font-bold text-text-primary font-display mb-4">Analisis Gap Harga per Kategori</h3>
        <div className="h-72">
          <ResponsiveContainer minWidth={1} minHeight={1} width="100%" height="100%">
            <BarChart data={priceGapData} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis dataKey="category" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}K`} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px' }} />
              <Legend iconType="circle" />
              <Bar dataKey="you" name="Toko Anda" fill="#0F4C81" radius={[4, 4, 0, 0]} maxBarSize={40} />
              <Bar dataKey="TokoMaju Digital" fill="#00C49A" radius={[4, 4, 0, 0]} maxBarSize={40} />
              <Bar dataKey="GadgetZone Store" fill="#F59E0B" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 p-3 bg-warning/10 border border-warning/30 rounded-lg flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-warning mt-0.5 shrink-0" />
          <p className="text-sm text-text-secondary">Kompetitor <span className="font-semibold">GadgetZone Store</span> menjual 12% lebih murah di kategori Elektronik. Pertimbangkan penyesuaian harga atau diferensiasi produk.</p>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-dn-border p-5">
        <h3 className="text-base font-bold text-text-primary font-display mb-3">Keyword Gap — Keywords Mereka, Bukan Anda</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {theirKeywords.map((kw) => (
            <div key={kw} className="flex items-center gap-2 px-3 py-2 bg-background rounded-lg text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-danger shrink-0" />
              <span className="text-text-secondary">{kw}</span>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-surface rounded-xl border border-dn-border p-6 w-96 shadow-2xl animate-fade-in">
            <h3 className="font-display font-bold text-text-primary mb-4">Tambah Kompetitor</h3>
            <input placeholder="Nama toko kompetitor..." className="w-full px-3 py-2 text-sm border border-dn-border rounded-lg bg-background text-text-primary mb-4 focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <div className="flex gap-2">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 text-sm font-semibold text-text-secondary border border-dn-border rounded-lg hover:bg-surface-hover">Batal</button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-light">Tambah</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
