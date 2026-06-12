'use client';
import { useState } from 'react';
import { DAYS_OF_WEEK } from '@/lib/constants';

interface HeatmapCell { day: number; hour: number; count: number; }
interface HeatmapChartProps { data: HeatmapCell[]; accentColor?: string; }

export function HeatmapChart({ data, accentColor = '#00C49A' }: HeatmapChartProps) {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; cell: HeatmapCell } | null>(null);
  const maxCount = Math.max(...data.map((d) => d.count), 1);
  const peak = data.reduce((max, d) => (d.count > max.count ? d : max), data[0]);

  return (
    <div className="relative">
      <div className="overflow-x-auto">
        <div className="inline-grid gap-0.5" style={{ gridTemplateColumns: `48px repeat(24, 1fr)` }}>
          {/* Header row */}
          <div />
          {Array.from({ length: 24 }, (_, h) => (
            <div key={h} className="text-[10px] text-text-muted text-center py-1 font-mono">{h}</div>
          ))}
          {/* Data rows */}
          {DAYS_OF_WEEK.map((dayLabel, dayIdx) => (
            <div key={dayIdx} className="contents">
              <div className="text-xs text-text-muted font-medium flex items-center pr-2 justify-end">{dayLabel}</div>
              {Array.from({ length: 24 }, (_, h) => {
                const cell = data.find((d) => d.day === dayIdx && d.hour === h);
                const count = cell?.count ?? 0;
                const opacity = count / maxCount;
                return (
                  <div
                    key={h}
                    className="w-6 h-6 rounded-sm cursor-pointer transition-transform hover:scale-110"
                    style={{ backgroundColor: accentColor, opacity: Math.max(0.05, opacity) }}
                    onMouseEnter={(e) => cell && setTooltip({ x: e.clientX, y: e.clientY, cell })}
                    onMouseLeave={() => setTooltip(null)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      {tooltip && (
        <div className="fixed z-50 px-3 py-2 bg-surface border border-dn-border rounded-lg shadow-lg text-xs" style={{ left: tooltip.x + 10, top: tooltip.y - 40 }}>
          <span className="font-semibold">{DAYS_OF_WEEK[tooltip.cell.day]} {tooltip.cell.hour}:00</span> — {tooltip.cell.count} pesanan
        </div>
      )}
      <p className="text-xs text-text-muted mt-3">
        📍 Peak: <span className="font-semibold text-text-secondary">{DAYS_OF_WEEK[peak.day]} {peak.hour}:00–{peak.hour + 1}:00</span> (avg {peak.count} pesanan)
      </p>
    </div>
  );
}
