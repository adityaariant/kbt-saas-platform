'use client';

import { useState, useEffect } from 'react';
import type { Keyword, Competitor } from '../types';
import { keywords, competitors } from '../mockData';

export function useKeywords() {
  const [data, setData] = useState<Keyword[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(keywords);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return { data, loading };
}

export function useCompetitors() {
  const [data, setData] = useState<Competitor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(competitors);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return { data, loading };
}
