'use client';
import { useState, useEffect } from 'react';
import { Target } from 'lucide-react';
import { useStore } from '@/lib/hooks/useStore';
import { formatRp, formatNumber } from '@/lib/utils';
import { kpiMetrics } from '@/lib/mockData';

export function GoalTracker() {
  const { revenueGoal, orderGoal, setGoals } = useStore();
  const [editMode, setEditMode] = useState(false);
  const [revInput, setRevInput] = useState(String(revenueGoal));
  const [ordInput, setOrdInput] = useState(String(orderGoal));

  const currentRevenue = kpiMetrics[0].value;
  const currentOrders = kpiMetrics[1].value;
  const revPct = Math.min(100, Math.round((currentRevenue / revenueGoal) * 100));
  const ordPct = Math.min(100, Math.round((currentOrders / orderGoal) * 100));
  const dayOfMonth = new Date().getDate();
  const monthProgress = Math.round((dayOfMonth / 30) * 100);
  const showWarning = monthProgress > 60 && (revPct < 40 || ordPct < 40);

  useEffect(() => {
    const saved = localStorage.getItem('dn_goals');
    if (saved) {
      const { revenue, orders } = JSON.parse(saved) as { revenue: number; orders: number };
      setGoals(revenue, orders);
    }
  }, [setGoals]);

  const handleSave = () => {
    const rev = parseInt(revInput) || revenueGoal;
    const ord = parseInt(ordInput) || orderGoal;
    setGoals(rev, ord);
    localStorage.setItem('dn_goals', JSON.stringify({ revenue: rev, orders: ord }));
    setEditMode(false);
  };

  return (
    <div className="bg-surface rounded-xl border border-dn-border p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-text-primary font-display flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" /> Target Bulanan
        </h3>
        <button onClick={() => setEditMode(!editMode)} className="text-xs font-medium text-primary hover:text-primary-light">
          {editMode ? 'Batal' : 'Edit Target'}
        </button>
      </div>
      {showWarning && (
        <div className="mb-4 p-3 bg-warning/10 border border-warning/30 rounded-lg text-sm text-warning font-medium">
          ⚠️ Bulan sudah berjalan {monthProgress}% tapi target belum tercapai 40%. Tingkatkan strategi penjualan Anda.
        </div>
      )}
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-text-secondary font-medium">Pendapatan</span>
            <span className="text-text-primary font-semibold font-mono">{formatRp(currentRevenue)} / {formatRp(revenueGoal)}</span>
          </div>
          <div className="h-3 bg-background rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500" style={{ width: `${revPct}%` }} />
          </div>
          <p className="text-xs text-text-muted mt-1 text-right font-mono">{revPct}%</p>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-text-secondary font-medium">Pesanan</span>
            <span className="text-text-primary font-semibold font-mono">{formatNumber(currentOrders)} / {formatNumber(orderGoal)}</span>
          </div>
          <div className="h-3 bg-background rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-accent to-info rounded-full transition-all duration-500" style={{ width: `${ordPct}%` }} />
          </div>
          <p className="text-xs text-text-muted mt-1 text-right font-mono">{ordPct}%</p>
        </div>
      </div>
      {editMode && (
        <div className="mt-4 pt-4 border-t border-dn-border space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-text-muted uppercase mb-1 block">Target Pendapatan</label>
              <input type="number" value={revInput} onChange={(e) => setRevInput(e.target.value)} className="w-full px-3 py-2 text-sm border border-dn-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="text-xs font-semibold text-text-muted uppercase mb-1 block">Target Pesanan</label>
              <input type="number" value={ordInput} onChange={(e) => setOrdInput(e.target.value)} className="w-full px-3 py-2 text-sm border border-dn-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </div>
          <button onClick={handleSave} className="w-full py-2 bg-primary hover:bg-primary-light text-white font-semibold rounded-lg text-sm transition-colors">Simpan Target</button>
        </div>
      )}
    </div>
  );
}
