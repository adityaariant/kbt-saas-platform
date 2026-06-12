'use client';
import Link from 'next/link';
import { Search, FileSearch, Users, ArrowRight } from 'lucide-react';

const summaryCards = [
  { label: 'Keywords Terlacak', value: '50', delta: '+5 baru', icon: Search },
  { label: 'Rata-rata Skor Listing', value: '81/100', delta: '+3.2%', icon: FileSearch },
  { label: 'Kompetitor Dipantau', value: '5', delta: 'Stabil', icon: Users },
];

const navCards = [
  { title: 'Analisis Listing', desc: 'Analisis judul dan deskripsi produk untuk optimasi SEO marketplace', href: '/marketplace/listing-analyzer', icon: FileSearch },
  { title: 'Riset Keyword', desc: 'Temukan keyword berpotensi tinggi dan lacak peringkat Anda', href: '/marketplace/keywords', icon: Search },
  { title: 'Pelacak Kompetitor', desc: 'Pantau harga, rating, dan strategi kompetitor', href: '/marketplace/competitor-tracker', icon: Users },
];

export default function MarketplaceOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary font-display">Optimasi Marketplace</h2>
        <p className="text-sm text-text-muted mt-1">Tingkatkan visibilitas dan performa listing Anda</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {summaryCards.map((card) => (
          <div key={card.label} className="bg-surface rounded-xl border border-dn-border p-5 flex items-start gap-4">
            <div className="p-2.5 bg-primary/10 rounded-lg"><card.icon className="w-5 h-5 text-primary" /></div>
            <div>
              <p className="text-xs font-semibold text-text-muted uppercase">{card.label}</p>
              <p className="text-2xl font-bold text-text-primary font-mono mt-1">{card.value}</p>
              <span className="text-xs text-accent font-medium">{card.delta}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {navCards.map((card) => (
          <Link key={card.href} href={card.href} className="bg-surface rounded-xl border border-dn-border p-5 hover:shadow-md hover:border-primary/30 transition-all group">
            <card.icon className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-display font-bold text-text-primary mb-1">{card.title}</h3>
            <p className="text-sm text-text-muted mb-3">{card.desc}</p>
            <span className="text-sm font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
              Buka <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}