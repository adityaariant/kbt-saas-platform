'use client';

import { useState, useMemo } from 'react';
import { topProducts } from '@/lib/mockData';
import { formatRp } from '@/lib/utils';
import { Search, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';

type SortKey = 'units' | 'revenue' | 'share';
type SortDir = 'asc' | 'desc';

interface TopProductRow {
  id: number;
  name: string;
  sku: string;
  category: string;
  units: number;
  revenue: number;
  revenueFormatted: string;
  share: number;
  trend: number[];
}

interface TopProductsTableProps {
  onRowClick?: (product: TopProductRow) => void;
}

const ROWS_PER_PAGE = 5;

export function TopProductsTable({ onRowClick }: TopProductsTableProps) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('units');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [page, setPage] = useState(0);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  const filtered = useMemo(() => {
    let data = [...topProducts] as TopProductRow[];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter((p) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
    }
    data.sort((a, b) => sortDir === 'asc' ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey]);
    return data;
  }, [search, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
  const pageData = filtered.slice(page * ROWS_PER_PAGE, (page + 1) * ROWS_PER_PAGE);

  return (
    <div className="bg-surface rounded-xl border border-dn-border overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-dn-border">
        <h3 className="text-base font-bold text-text-primary font-display">Produk Terlaris</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            className="pl-9 pr-3 py-1.5 text-sm border border-dn-border rounded-lg bg-background text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 w-48"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-xs uppercase tracking-wider text-text-muted border-b border-dn-border bg-background">
              <th className="px-5 py-3 font-semibold">#</th>
              <th className="px-5 py-3 font-semibold">Produk</th>
              <th className="px-5 py-3 font-semibold">SKU</th>
              <th className="px-5 py-3 font-semibold cursor-pointer select-none" onClick={() => handleSort('units')}>
                <span className="flex items-center gap-1">Terjual <ArrowUpDown className="w-3 h-3" /></span>
              </th>
              <th className="px-5 py-3 font-semibold cursor-pointer select-none" onClick={() => handleSort('revenue')}>
                <span className="flex items-center gap-1">Pendapatan <ArrowUpDown className="w-3 h-3" /></span>
              </th>
              <th className="px-5 py-3 font-semibold cursor-pointer select-none" onClick={() => handleSort('share')}>
                <span className="flex items-center gap-1">Share <ArrowUpDown className="w-3 h-3" /></span>
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {pageData.map((product, idx) => (
              <tr
                key={product.id}
                onClick={() => onRowClick?.(product)}
                className="border-b border-dn-border/50 hover:bg-surface-hover transition-colors cursor-pointer"
              >
                <td className="px-5 py-3 text-text-muted font-bold">#{page * ROWS_PER_PAGE + idx + 1}</td>
                <td className="px-5 py-3">
                  <div>
                    <p className="font-semibold text-text-primary">{product.name}</p>
                    <p className="text-xs text-text-muted">{product.category}</p>
                  </div>
                </td>
                <td className="px-5 py-3 text-text-secondary font-mono text-xs">{product.sku}</td>
                <td className="px-5 py-3 text-text-secondary font-medium font-mono">{product.units.toLocaleString('id-ID')}</td>
                <td className="px-5 py-3 text-text-secondary font-medium font-mono">{formatRp(product.revenue)}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-background rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${product.share}%` }} />
                    </div>
                    <span className="text-xs text-text-muted font-mono">{product.share}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-5 py-3 border-t border-dn-border">
          <span className="text-xs text-text-muted">
            {filtered.length} produk ditemukan
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="p-1.5 rounded-lg hover:bg-surface-hover disabled:opacity-30 text-text-muted"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-medium text-text-secondary">
              {page + 1} / {totalPages}
            </span>
            <button
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page >= totalPages - 1}
              className="p-1.5 rounded-lg hover:bg-surface-hover disabled:opacity-30 text-text-muted"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
