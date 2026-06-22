'use client';
import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ForecastPoint { week: string; actual: number | null; forecast: number; lower: number; upper: number; }
interface ForecastChartProps { data: ForecastPoint[]; height?: number; }

export function ForecastChart({ data, height = 350 }: ForecastChartProps) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer minWidth={1} minHeight={1} width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 10, bottom: 5, left: 0 }}>
          <defs>
            <linearGradient id="confBand" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0F4C81" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#0F4C81" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
          <XAxis dataKey="week" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${(v / 1000000).toFixed(1)}M`} />
          <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px' }} />
          <Area type="monotone" dataKey="upper" stroke="none" fill="url(#confBand)" />
          <Area type="monotone" dataKey="lower" stroke="none" fill="var(--background)" />
          <Line type="monotone" dataKey="actual" stroke="#0F4C81" strokeWidth={2} dot={{ r: 3, fill: '#0F4C81' }} connectNulls={false} name="Aktual" />
          <Line type="monotone" dataKey="forecast" stroke="#0F4C81" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Prediksi" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
