'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock login delay
    setTimeout(() => {
      router.push('/');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-text-primary font-display">Masuk ke Akun</h1>
        <p className="text-sm text-text-muted mt-1">Selamat datang kembali di dashboard Anda</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-text-secondary block mb-1.5">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="w-5 h-5 text-text-muted" />
            </div>
            <input 
              type="email" 
              required
              defaultValue="admin@dataniaga.id"
              className="w-full pl-10 pr-3 py-2.5 text-sm border border-dn-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors" 
              placeholder="nama@email.com" 
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-semibold text-text-secondary">Kata Sandi</label>
            <Link href="/forgot-password" className="text-xs font-semibold text-primary hover:text-primary-light transition-colors">
              Lupa Sandi?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="w-5 h-5 text-text-muted" />
            </div>
            <input 
              type="password" 
              required
              defaultValue="password123"
              className="w-full pl-10 pr-3 py-2.5 text-sm border border-dn-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors" 
              placeholder="••••••••" 
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
            <>Masuk <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
      </form>

      <div className="text-center text-sm text-text-secondary pt-4 border-t border-dn-border">
        Belum punya akun? <Link href="/register" className="font-semibold text-primary hover:text-primary-light transition-colors">Daftar Sekarang</Link>
      </div>
    </div>
  );
}
