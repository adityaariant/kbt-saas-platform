'use client';

import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface AreaChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  yKey: string;
  height?: number;
  color?: string;
  gradientId?: string;
  formatY?: (val: number) => string;
  formatTooltip?: (val: number | string) => string;
}

interface TooltipPayloadEntry {
  value: number | string;
  name: string;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  label?: string;
  formatTooltip?: (val: number | string) => string;
}

function CustomTooltip({ active, payload, label, formatTooltip }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  const value = payload[0].value;
  const formatted = formatTooltip ? formatTooltip(value) : String(value);

  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-lg dark:border-slate-700 dark:bg-slate-800">
      <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
        {formatted}
      </p>
    </div>
  );
}

export default function AreaChart({
  data,
  xKey,
  yKey,
  height = 300,
  color = '#0F4C81',
  gradientId = 'areaGradient',
  formatY,
  formatTooltip: formatTooltipProp,
}: AreaChartProps) {
  const uniqueGradientId = gradientId;

  return (
    <ResponsiveContainer minWidth={1} minHeight={1} width="100%" height={height}>
      <RechartsAreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={uniqueGradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.2} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#e2e8f0"
          vertical={false}
        />
        <XAxis
          dataKey={xKey}
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11, fill: '#94a3b8' }}
          dy={8}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11, fill: '#94a3b8' }}
          tickFormatter={formatY}
          width={48}
        />
        <Tooltip
          content={<CustomTooltip formatTooltip={formatTooltipProp} />}
          cursor={{ stroke: color, strokeWidth: 1, strokeDasharray: '4 4' }}
        />
        <Area
          type="monotone"
          dataKey={yKey}
          stroke={color}
          strokeWidth={2}
          fill={`url(#${uniqueGradientId})`}
          dot={false}
          activeDot={{ r: 4, fill: color, strokeWidth: 0 }}
        />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
}
