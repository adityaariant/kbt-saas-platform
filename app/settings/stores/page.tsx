'use client';
import { useState } from 'react';
import { Plus, Store as StoreIcon, MoreVertical } from 'lucide-react';
import { useStore } from '@/lib/hooks/useStore';

export default function StoresSettingsPage() {
  const [showModal, setShowModal] = useState(false);
  const activeStoreId = useStore(s => s.activeStoreId);

  const stores = [
    { id: 'store-1', name: 'TokoMaju Digital', platform: 'Shopee', status: 'connected', lastSync: '10 menit yang lalu' },
    { id: 'store-2', name: 'TokoMaju Official', platform: 'Tokopedia', status: 'connected', lastSync: '15 menit yang lalu' },
    { id: 'store-3', name: 'Maju Jaya Store', platform: 'Lazada', status: 'error', lastSync: '2 hari yang lalu' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-text-primary font-display">Manajemen Toko</h3>
          <p className="text-sm text-text-muted mt-1">Kelola integrasi toko dari berbagai marketplace</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-light transition-colors"
        >
          <Plus className="w-4 h-4" /> Hubungkan Toko
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stores.map((store) => (
          <div key={store.id} className={`bg-background rounded-xl border p-5 relative ${store.id === activeStoreId ? 'border-primary ring-1 ring-primary/20' : 'border-dn-border'}`}>
            <div className="absolute top-4 right-4 text-text-muted hover:text-text-primary cursor-pointer">
              <MoreVertical className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <StoreIcon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-text-primary text-sm">{store.name}</h4>
                <p className="text-xs text-text-secondary">{store.platform}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-dn-border/50 text-xs">
              <span className="text-text-muted">Sinkronisasi terakhir:</span>
              <span className="font-medium text-text-secondary">{store.lastSync}</span>
            </div>
            
            <div className="mt-3 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${store.status === 'connected' ? 'bg-accent' : 'bg-danger'}`} />
              <span className={`text-xs font-semibold ${store.status === 'connected' ? 'text-accent-dark' : 'text-danger'}`}>
                {store.status === 'connected' ? 'Terhubung' : 'Koneksi Terputus'}
              </span>
            </div>
            
            {store.id === activeStoreId && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Aktif
              </div>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-surface rounded-xl border border-dn-border p-6 w-[400px] shadow-2xl animate-fade-in">
            <h3 className="font-display font-bold text-text-primary mb-1">Hubungkan Toko Baru</h3>
            <p className="text-sm text-text-muted mb-4">Pilih platform marketplace</p>
            
            <div className="space-y-3 mb-6">
              {['Shopee', 'Tokopedia', 'Lazada', 'TikTok Shop'].map((platform) => (
                <label key={platform} className="flex items-center gap-3 p-3 rounded-lg border border-dn-border hover:border-primary/50 cursor-pointer bg-background">
                  <input type="radio" name="platform" className="text-primary focus:ring-primary accent-primary" />
                  <span className="text-sm font-medium text-text-primary">{platform}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 text-sm font-semibold text-text-secondary border border-dn-border rounded-lg hover:bg-surface-hover">Batal</button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-light">Lanjutkan Integrasi</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
