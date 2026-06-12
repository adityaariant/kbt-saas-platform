'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatRp } from '@/lib/utils';

interface ElasticityPoint {
  price: number;
  demand: number;
}

interface ElasticityChartProps {
  data: ElasticityPoint[];
  height?: number;
}

export function ElasticityChart({ data, height = 350 }: ElasticityChartProps) {
  // Add a revenue field for the tooltip
  const chartData = data.map(d => ({
    ...d,
    revenue: d.price * d.demand
  }));

  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
          <XAxis 
            dataKey="price" 
            tick={{ fontSize: 11, fill: 'var(--text-muted)' }} 
            axisLine={false} 
            tickLine={false}
            tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}K`}
            label={{ value: 'Harga', position: 'bottom', fontSize: 12, fill: 'var(--text-muted)', offset: 0 }}
          />
          <YAxis 
            yAxisId="left"
            tick={{ fontSize: 11, fill: 'var(--text-muted)' }} 
            axisLine={false} 
            tickLine={false}
            label={{ value: 'Permintaan (Unit)', angle: -90, position: 'insideLeft', fontSize: 12, fill: 'var(--text-muted)', offset: 0 }}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px' }}
            formatter={(value: unknown, name: any) => {
              if (name === 'revenue') return [formatRp(Number(value)), 'Pendapatan Estimasi'];
              if (name === 'demand') return [`${value} unit`, 'Permintaan'];
              return [value as React.ReactNode, name];
            }}
            labelFormatter={(label: unknown) => `Harga: ${formatRp(Number(label))}`}
          />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="demand" 
            stroke="#0F4C81" 
            strokeWidth={3} 
            dot={{ r: 4, fill: '#0F4C81', strokeWidth: 2, stroke: '#fff' }} 
            activeDot={{ r: 6 }}
            name="demand"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
