'use client';

import { cn } from '@/lib/utils';
import type { KpiMetric } from '@/lib/types';
import { SparklineChart } from '@/components/charts/SparklineChart';

interface KpiCardProps {
  metric: KpiMetric;
  index: number;
}

export function KpiCard({ metric, index }: KpiCardProps) {
  const isPositive = metric.delta >= 0;

  return (
    <div
      className={cn(
        'bg-surface rounded-xl border border-dn-border p-4 lg:p-5',
        'flex flex-col justify-between gap-3 min-h-[120px]',
        'hover:shadow-md transition-shadow duration-200',
      )}
    >
      <div className="flex items-start justify-between">
        <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">
          {metric.label}
        </p>
        <span
          className={cn(
            'text-xs font-bold px-2 py-0.5 rounded-full',
            isPositive
              ? 'bg-accent/10 text-accent-dark'
              : 'bg-danger/10 text-danger',
          )}
        >
          {isPositive ? '↑' : '↓'} {Math.abs(metric.delta).toFixed(1)}%
        </span>
      </div>
      <div className="flex items-end justify-between gap-2">
        <h3 className="text-2xl lg:text-3xl font-bold text-text-primary font-mono tracking-tight">
          {metric.formattedValue}
        </h3>
        <SparklineChart
          data={metric.sparkline}
          positive={isPositive}
          width={72}
          height={28}
        />
      </div>
    </div>
  );
}
