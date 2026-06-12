'use client';
import { useState } from 'react';
import { Camera, Save } from 'lucide-react';

export default function ProfileSettingsPage() {
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 800);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h3 className="text-lg font-bold text-text-primary font-display">Profil Saya</h3>
        <p className="text-sm text-text-muted mt-1">Kelola informasi pribadi dan kata sandi Anda</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative group cursor-pointer">
          <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold font-display shadow-inner">
            DN
          </div>
          <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="w-6 h-6 text-white" />
          </div>
        </div>
        <div>
          <button className="px-4 py-2 bg-surface hover:bg-surface-hover text-text-primary border border-dn-border rounded-lg text-sm font-semibold transition-colors">
            Ubah Foto
          </button>
          <p className="text-xs text-text-muted mt-2">JPG, GIF atau PNG. Maksimal 2MB.</p>
        </div>
      </div>

      <div className="max-w-xl space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-text-secondary block mb-1.5">Nama Depan</label>
            <input defaultValue="Admin" className="w-full px-3 py-2 text-sm border border-dn-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div>
            <label className="text-sm font-semibold text-text-secondary block mb-1.5">Nama Belakang</label>
            <input defaultValue="DataNiaga" className="w-full px-3 py-2 text-sm border border-dn-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold text-text-secondary block mb-1.5">Email</label>
          <input defaultValue="admin@dataniaga.id" disabled className="w-full px-3 py-2 text-sm border border-dn-border rounded-lg bg-surface-hover text-text-muted cursor-not-allowed" />
          <p className="text-xs text-text-muted mt-1">Email digunakan untuk login dan tidak dapat diubah.</p>
        </div>
        <div className="pt-4">
          <h4 className="text-sm font-bold text-text-primary mb-4">Ubah Kata Sandi</h4>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-text-secondary block mb-1.5">Kata Sandi Saat Ini</label>
              <input type="password" placeholder="••••••••" className="w-full px-3 py-2 text-sm border border-dn-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="text-sm font-semibold text-text-secondary block mb-1.5">Kata Sandi Baru</label>
              <input type="password" placeholder="Minimal 8 karakter" className="w-full px-3 py-2 text-sm border border-dn-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-dn-border">
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light transition-colors text-sm disabled:opacity-70"
          >
            {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>
      </div>
    </div>
  );
}
