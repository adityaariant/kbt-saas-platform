'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Store, Link2, Settings, ArrowRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setLoading(true);
      setTimeout(() => {
        // Trigger confetti
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: ReturnType<typeof setInterval> = setInterval(function() {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);
          confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
          confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);

        setTimeout(() => {
          router.push('/');
        }, 2000);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-surface border border-dn-border rounded-2xl shadow-xl overflow-hidden animate-fade-in">
        
        {/* Progress Bar */}
        <div className="flex bg-surface-hover border-b border-dn-border">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`flex-1 h-2 transition-colors ${s <= step ? 'bg-primary' : 'bg-transparent'}`} />
          ))}
        </div>

        <div className="p-8 md:p-12">
          {step === 1 && (
            <div className="space-y-6 animate-slide-right">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                <Store className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold font-display text-text-primary">Profil Bisnis Anda</h2>
              <p className="text-text-secondary">Mari mulai dengan mengenal bisnis Anda agar kami dapat menyesuaikan rekomendasi analitik.</p>
              
              <div className="space-y-4 pt-4">
                <div>
                  <label className="text-sm font-semibold text-text-secondary block mb-1.5">Kategori Produk Utama</label>
                  <select className="w-full px-3 py-3 text-sm border border-dn-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30">
                    <option>Pilih Kategori</option>
                    <option>Fashion & Apparel</option>
                    <option>Elektronik & Gadget</option>
                    <option>Rumah Tangga</option>
                    <option>Kecantikan & Perawatan</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-text-secondary block mb-1.5">Skala Penjualan Bulanan</label>
                  <select className="w-full px-3 py-3 text-sm border border-dn-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30">
                    <option>&lt; 100 Pesanan</option>
                    <option>100 - 1,000 Pesanan</option>
                    <option>1,000 - 10,000 Pesanan</option>
                    <option>&gt; 10,000 Pesanan</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-slide-right">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                <Link2 className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold font-display text-text-primary">Hubungkan Toko</h2>
              <p className="text-text-secondary">Integrasikan akun marketplace Anda untuk mulai menarik data performa secara otomatis.</p>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                {['Shopee', 'Tokopedia', 'Lazada', 'TikTok Shop'].map((platform) => (
                  <label key={platform} className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl border border-dn-border hover:border-primary/50 cursor-pointer bg-background transition-colors">
                    <input type="checkbox" className="hidden peer" />
                    <div className="w-full h-full absolute inset-0 rounded-xl peer-checked:bg-primary/5 peer-checked:border-primary border-2 border-transparent pointer-events-none transition-colors" />
                    <span className="font-semibold text-text-primary z-10">{platform}</span>
                    <span className="text-xs text-text-muted z-10">Hubungkan</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-text-muted text-center pt-2">Anda dapat menghubungkan toko nanti di menu Pengaturan.</p>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-slide-right">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                <Settings className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold font-display text-text-primary">Tentukan Tujuan Anda</h2>
              <p className="text-text-secondary">Apa fokus utama Anda menggunakan Ecometrics?</p>
              
              <div className="space-y-3 pt-4">
                {[
                  'Meningkatkan tingkat konversi listing',
                  'Menganalisis kompetitor dan harga',
                  'Memprediksi tren penjualan masa depan',
                  'Mengurangi churn pelanggan',
                  'Otomatisasi laporan bulanan'
                ].map((goal, i) => (
                  <label key={i} className="flex items-center gap-3 p-4 rounded-xl border border-dn-border hover:border-primary/50 cursor-pointer bg-background group">
                    <input type="checkbox" className="w-5 h-5 text-primary border-dn-border rounded focus:ring-primary" />
                    <span className="font-medium text-text-primary group-hover:text-primary transition-colors">{goal}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="pt-10 mt-6 border-t border-dn-border flex items-center justify-between">
            <button 
              onClick={() => setStep(step - 1)} 
              className={`text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors ${step === 1 ? 'invisible' : ''}`}
            >
              Kembali
            </button>
            <button 
              onClick={handleNext}
              disabled={loading}
              className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light transition-colors disabled:opacity-70"
            >
              {loading ? (
                <>Menyiapkan Dashboard <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin ml-2" /></>
              ) : step === 3 ? (
                <>Selesai <CheckCircle2 className="w-5 h-5" /></>
              ) : (
                <>Selanjutnya <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
