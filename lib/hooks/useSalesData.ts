'use client';

import { useState, useEffect } from 'react';
import type { SaleRecord } from '../types';
import { salesRecords } from '../mockData';

export function useSalesData(daysBack: number = 30) {
  const [data, setData] = useState<SaleRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(true), 0);
    const timer = setTimeout(() => {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - daysBack);
      const cutoffStr = cutoff.toISOString().split('T')[0];
      const filtered = salesRecords.filter(r => r.date >= cutoffStr);
      setData(filtered);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [daysBack]);

  return { data, loading };
}
