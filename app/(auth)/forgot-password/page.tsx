'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  if (sent) {
    return (
      <div className="space-y-6 text-center animate-fade-in">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-text-primary font-display">Email Terkirim!</h1>
          <p className="text-sm text-text-muted mt-2">
            Kami telah mengirimkan instruksi untuk mengatur ulang kata sandi Anda. Silakan periksa kotak masuk (atau folder spam) Anda.
          </p>
        </div>
        <Link href="/login" className="inline-flex items-center justify-center gap-2 py-2.5 px-6 bg-surface text-text-primary border border-dn-border font-semibold rounded-lg hover:bg-surface-hover transition-colors text-sm w-full">
          Kembali ke Login
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-text-primary font-display">Lupa Kata Sandi?</h1>
        <p className="text-sm text-text-muted mt-1">Masukkan email Anda untuk mengatur ulang kata sandi</p>
      </div>

      <form onSubmit={handleReset} className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-text-secondary block mb-1.5">Email Terdaftar</label>
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

        <button 
          type="submit" 
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-2.5 mt-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light transition-colors disabled:opacity-70"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>Kirim Tautan Reset <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
      </form>

      <div className="text-center text-sm text-text-secondary pt-4 border-t border-dn-border">
        Ingat kata sandi Anda? <Link href="/login" className="font-semibold text-primary hover:text-primary-light transition-colors">Kembali ke Login</Link>
      </div>
    </div>
  );
}
