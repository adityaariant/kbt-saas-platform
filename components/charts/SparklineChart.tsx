'use client';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface SparklineChartProps {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
  positive?: boolean;
}

export function SparklineChart({ data, width = 80, height = 32, positive = true }: SparklineChartProps) {
  const chartData = data.map((v, i) => ({ i, v }));
  const strokeColor = positive ? '#00C49A' : '#EF4444';

  return (
    <div style={{ width, height }}>
      <ResponsiveContainer minWidth={1} minHeight={1} width="100%" height="100%">
        <LineChart data={chartData}>
          <Line type="monotone" dataKey="v" stroke={strokeColor} strokeWidth={1.5} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
