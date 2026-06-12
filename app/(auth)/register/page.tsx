'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push('/onboarding');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-text-primary font-display">Daftar Akun Baru</h1>
        <p className="text-sm text-text-muted mt-1">Mulai optimasi toko Anda dalam 2 menit</p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-text-secondary block mb-1.5">Nama Lengkap</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="w-5 h-5 text-text-muted" />
            </div>
            <input 
              type="text" 
              required
              className="w-full pl-10 pr-3 py-2.5 text-sm border border-dn-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors" 
              placeholder="Budi Santoso" 
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-text-secondary block mb-1.5">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="w-5 h-5 text-text-muted" />
            </div>
            <input 
              type="email" 
              required
              className="w-full pl-10 pr-3 py-2.5 text-sm border border-dn-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors" 
              placeholder="nama@email.com" 
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-text-secondary block mb-1.5">Kata Sandi</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="w-5 h-5 text-text-muted" />
            </div>
            <input 
              type="password" 
              required
              className="w-full pl-10 pr-3 py-2.5 text-sm border border-dn-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors" 
              placeholder="Minimal 8 karakter" 
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-2.5 mt-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light transition-colors disabled:opacity-70"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>Buat Akun <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
      </form>

      <div className="text-center text-sm text-text-secondary pt-4 border-t border-dn-border">
        Sudah punya akun? <Link href="/login" className="font-semibold text-primary hover:text-primary-light transition-colors">Masuk di sini</Link>
      </div>
    </div>
  );
}
