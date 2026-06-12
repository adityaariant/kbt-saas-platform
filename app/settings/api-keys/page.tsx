'use client';
import { useState } from 'react';
import { Key, Copy, Plus, Trash2 } from 'lucide-react';

export default function ApiKeysSettingsPage() {
  const [keys, setKeys] = useState([
    { id: 1, name: 'Sistem ERP Internal', key: 'dn_live_xxxxxxxxxxxxxxxxxxxxxx9f2a', created: '10 Mei 2025', lastUsed: 'Hari ini, 10:45' },
    { id: 2, name: 'Google Data Studio', key: 'dn_live_xxxxxxxxxxxxxxxxxxxxxx4b8c', created: '15 Apr 2025', lastUsed: 'Kemarin, 23:10' }
  ]);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus API Key ini? Integrasi yang menggunakannya akan berhenti berfungsi.')) {
      setKeys(keys.filter(k => k.id !== id));
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-text-primary font-display">API Keys</h3>
          <p className="text-sm text-text-muted mt-1">Kelola akses API untuk integrasi sistem pihak ketiga</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-light transition-colors"
        >
          <Plus className="w-4 h-4" /> Buat API Key Baru
        </button>
      </div>

      <div className="bg-info/10 border border-info/30 rounded-lg p-4 flex gap-3">
        <Key className="w-5 h-5 text-info shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-semibold text-text-primary mb-1">Amankan API Key Anda</h4>
          <p className="text-sm text-text-secondary">API key memberikan akses penuh ke data toko Anda. Jangan pernah membagikan kunci ini secara publik atau memasukkannya ke dalam kode frontend client-side.</p>
        </div>
      </div>

      <div className="border border-dn-border rounded-xl overflow-hidden bg-background">
        <table className="w-full text-sm text-left">
          <thead className="bg-surface border-b border-dn-border">
            <tr>
              <th className="px-5 py-3 text-text-secondary font-semibold">Nama Integrasi</th>
              <th className="px-5 py-3 text-text-secondary font-semibold">API Key</th>
              <th className="px-5 py-3 text-text-secondary font-semibold">Dibuat Pada</th>
              <th className="px-5 py-3 text-text-secondary font-semibold">Terakhir Digunakan</th>
              <th className="px-5 py-3 text-text-secondary font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dn-border/50">
            {keys.map((k) => (
              <tr key={k.id}>
                <td className="px-5 py-4 font-medium text-text-primary">{k.name}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <code className="bg-surface px-2 py-1 rounded text-xs text-text-secondary font-mono border border-dn-border">{k.key}</code>
                    <button className="text-text-muted hover:text-primary transition-colors"><Copy className="w-4 h-4" /></button>
                  </div>
                </td>
                <td className="px-5 py-4 text-text-secondary text-xs">{k.created}</td>
                <td className="px-5 py-4 text-text-secondary text-xs">{k.lastUsed}</td>
                <td className="px-5 py-4 text-right">
                  <button onClick={() => handleDelete(k.id)} className="text-text-muted hover:text-danger transition-colors p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {keys.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-text-muted">Belum ada API Key yang dibuat.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-surface rounded-xl border border-dn-border p-6 w-[400px] shadow-2xl animate-fade-in">
            <h3 className="font-display font-bold text-text-primary mb-1">Buat API Key Baru</h3>
            <p className="text-sm text-text-muted mb-4">Berikan nama untuk mengidentifikasi penggunaan key ini</p>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm font-semibold text-text-secondary block mb-1.5">Nama Integrasi</label>
                <input placeholder="Contoh: Aplikasi Akuntansi" className="w-full px-3 py-2 text-sm border border-dn-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 text-sm font-semibold text-text-secondary border border-dn-border rounded-lg hover:bg-surface-hover">Batal</button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-light">Buat Key</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
