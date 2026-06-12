'use client';

import { useState, useEffect } from 'react';
import type { ForecastPoint, CohortRow, ElasticityPoint, Customer } from '../types';
import { forecastData, cohortData, elasticityData, customers, scatterData } from '../mockData';

export function useForecastData() {
  const [data, setData] = useState<ForecastPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(forecastData);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return { data, loading };
}

export function useCohortData() {
  const [data, setData] = useState<CohortRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(cohortData);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return { data, loading };
}

export function useElasticityData() {
  const [data, setData] = useState<ElasticityPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(elasticityData);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return { data, loading };
}

export function useCustomerSegments() {
  const [data, setData] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(customers);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return { data, loading };
}

export function useScatterData() {
  const [data, setData] = useState<{ adSpend: number; revenue: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(scatterData);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return { data, loading };
}
