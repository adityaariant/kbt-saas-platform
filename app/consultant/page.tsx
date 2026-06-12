'use client';
import Link from 'next/link';
import { TrendingUp, PieChart, FlaskConical, Grid3x3, DollarSign, ArrowRight } from 'lucide-react';

const insights = [
  { label: 'Prediksi Pendapatan', value: 'Rp 140.2M', delta: '+11.8%', positive: true },
  { label: 'Segmen Terbaik', value: 'Champions', delta: '150 pelanggan', positive: true },
  { label: 'Risiko Churn', value: '23 pelanggan', delta: 'Naik 5%', positive: false },
  { label: 'A/B Test Terakhir', value: 'p=0.034', delta: 'Signifikan', positive: true },
];

const navCards = [
  { title: 'Forecasting', desc: 'Prediksi penjualan berdasarkan tren historis', href: '/consultant/forecasting', icon: TrendingUp },
  { title: 'Segmentasi Pelanggan', desc: 'Analisis RFM dan segmen pelanggan Anda', href: '/consultant/customer-segments', icon: PieChart },
  { title: 'A/B Testing', desc: 'Uji signifikansi untuk keputusan data-driven', href: '/consultant/ab-testing', icon: FlaskConical },
  { title: 'Cohort Analysis', desc: 'Retensi pelanggan berdasarkan kohort akuisisi', href: '/consultant/cohort', icon: Grid3x3 },
  { title: 'Elastisitas Harga', desc: 'Analisis sensitivitas harga terhadap permintaan', href: '/consultant/price-elasticity', icon: DollarSign },
];

export default function ConsultantOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary font-display">Konsultan Bisnis</h2>
        <p className="text-sm text-text-muted mt-1">Analisis lanjutan dan rekomendasi berbasis data</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((ins) => (
          <div key={ins.label} className="bg-surface rounded-xl border border-dn-border p-5">
            <p className="text-xs font-semibold text-text-muted uppercase">{ins.label}</p>
            <p className="text-2xl font-bold text-text-primary font-mono mt-2">{ins.value}</p>
            <span className={`text-xs font-bold ${ins.positive ? 'text-accent' : 'text-danger'}`}>{ins.delta}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {navCards.map((card) => (
          <Link key={card.href} href={card.href} className="bg-surface rounded-xl border border-dn-border p-5 hover:shadow-md hover:border-primary/30 transition-all group">
            <card.icon className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-display font-bold text-text-primary mb-1">{card.title}</h3>
            <p className="text-sm text-text-muted mb-3">{card.desc}</p>
            <span className="text-sm font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">Buka <ArrowRight className="w-4 h-4" /></span>
          </Link>
        ))}
      </div>
    </div>
  );
}