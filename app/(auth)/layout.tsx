import { ChartColumnBig } from 'lucide-react';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-surface border border-dn-border rounded-2xl shadow-xl overflow-hidden animate-fade-in">
        <div className="p-8 pb-6 text-center border-b border-dn-border/50">
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary-light transition-colors">
            <ChartColumnBig className="w-8 h-8" />
            <span className="font-display font-bold text-2xl tracking-tight text-text-primary">Ecommetrics</span>
          </Link>
          <p className="text-sm text-text-muted mt-2">Jual Lebih Cerdas, Bukan Lebih Keras.</p>
        </div>
        <div className="p-8 pt-6">
          {children}
        </div>
      </div>
    </div>
  );
}
