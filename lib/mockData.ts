// ============================================================
// Ecommetrics — Comprehensive Mock Data Layer
// Deterministic generation using seeded pseudo-random
// ============================================================
import type {
  Product, SaleRecord, Customer, Keyword, Competitor,
  AppNotification, Store, ForecastPoint, CohortRow,
  ElasticityPoint, InvoiceRecord, ApiKey, KpiMetric,
  SalesHeatmapCell,
} from './types';
import { CATEGORIES, CHANNELS } from './constants';
import { seededRandom } from './utils';

// --- Deterministic seed helper ---
function sr(seed: number): number {
  return seededRandom(seed);
}

// ============================================================
// PRODUCTS (20 items, 4 categories)
// ============================================================
const productNames: Record<string, string[]> = {
  Fashion: ['Kemeja Slim Fit', 'Celana Chino Premium', 'Blazer Casual', 'Sepatu Loafer', 'Tas Ransel Urban'],
  Elektronik: ['Earbuds TWS Pro', 'Power Bank 20K', 'Keyboard Mech Mini', 'Webcam HD 1080p', 'Mouse Wireless Ergo'],
  'Rumah Tangga': ['Rak Bumbu Dapur', 'Set Wadah Kaca', 'Lampu LED Smart', 'Sapu Pel Putar', 'Dispenser Sabun Auto'],
  Kecantikan: ['Serum Vitamin C', 'Sunscreen SPF50', 'Lip Tint Matte', 'Micellar Water 300ml', 'Sheet Mask Bundle'],
};

export const products: Product[] = [];
let productIdx = 0;
for (const cat of CATEGORIES) {
  for (const pName of productNames[cat]) {
    const seed = productIdx * 17 + 3;
    products.push({
      id: `PRD-${String(productIdx + 1).padStart(3, '0')}`,
      name: pName,
      sku: `SKU-${cat.substring(0, 3).toUpperCase()}-${String(productIdx + 1).padStart(3, '0')}`,
      category: cat,
      price: Math.floor(sr(seed) * 450000) + 25000,
    });
    productIdx++;
  }
}

// ============================================================
// SALES RECORDS (~5000 rows, 365 days)
// ============================================================
export const salesRecords: SaleRecord[] = [];
const baseDate = new Date('2025-06-12');
for (let day = 0; day < 365; day++) {
  const d = new Date(baseDate);
  d.setDate(d.getDate() - (364 - day));
  const dateStr = d.toISOString().split('T')[0];
  const recordsPerDay = 10 + Math.floor(sr(day * 7 + 1) * 10);

  for (let r = 0; r < recordsPerDay; r++) {
    const seed = day * 100 + r;
    const prod = products[Math.floor(sr(seed * 3) * products.length)];
    const channel = CHANNELS[Math.floor(sr(seed * 5) * 3)];
    const qty = Math.floor(sr(seed * 7) * 8) + 1;
    salesRecords.push({
      date: dateStr,
      productId: prod.id,
      channel,
      qty,
      revenue: qty * prod.price,
    });
  }
}

// ============================================================
// CUSTOMERS (150)
// ============================================================
const firstNames = ['Andi', 'Budi', 'Citra', 'Dewi', 'Eka', 'Fajar', 'Gita', 'Hadi', 'Indra', 'Joko',
  'Kartika', 'Lina', 'Mira', 'Nina', 'Omar', 'Putri', 'Rani', 'Sari', 'Tono', 'Umar',
  'Vita', 'Wati', 'Yanti', 'Zaki', 'Agus', 'Bima', 'Cahya', 'Dian', 'Elsa', 'Fani'];

const lastNames = ['Pratama', 'Wijaya', 'Susanto', 'Setiawan', 'Hidayat', 'Kurniawan', 'Santoso', 'Nugraha', 'Putra', 'Wibowo'];

const segments = ['Champions', 'Loyal', 'Potential', 'New', 'At Risk', 'Lost'];

export const customers: Customer[] = Array.from({ length: 150 }, (_, i) => {
  const seed = i * 13 + 7;
  const firstName = firstNames[Math.floor(sr(seed) * firstNames.length)];
  const lastName = lastNames[Math.floor(sr(seed + 1) * lastNames.length)];
  const totalSpend = Math.floor(sr(seed + 2) * 50000000) + 500000;
  const orderCount = Math.floor(sr(seed + 3) * 30) + 1;
  const daysAgo = Math.floor(sr(seed + 4) * 180);
  const lastDate = new Date(baseDate);
  lastDate.setDate(lastDate.getDate() - daysAgo);
  const recency = Math.max(1, 5 - Math.floor(daysAgo / 30));
  const frequency = Math.min(5, Math.ceil(orderCount / 5));
  const monetary = Math.min(5, Math.ceil(totalSpend / 10000000));
  const segIdx = Math.floor(sr(seed + 5) * segments.length);

  return {
    id: `CUST-${String(i + 1).padStart(4, '0')}`,
    name: `${firstName} ${lastName}`,
    totalSpend,
    orderCount,
    lastOrderDate: lastDate.toISOString().split('T')[0],
    segment: segments[segIdx],
    recencyScore: recency,
    frequencyScore: frequency,
    monetaryScore: monetary,
  };
});

// ============================================================
// KEYWORDS (50)
// ============================================================
const keywordBase = [
  'kemeja pria slim fit', 'celana chino', 'blazer casual', 'sepatu loafer kulit',
  'tas ransel laptop', 'earbuds bluetooth', 'power bank fast charge', 'keyboard mechanical',
  'webcam streaming', 'mouse wireless', 'rak dapur minimalis', 'wadah makanan kaca',
  'lampu led smart', 'sapu pel lantai', 'dispenser sabun otomatis', 'serum wajah',
  'sunscreen murah', 'lip tint tahan lama', 'micellar water', 'masker wajah',
  'baju kerja pria', 'celana panjang formal', 'jaket bomber', 'sneakers putih',
  'dompet kulit asli', 'charger multi port', 'speaker bluetooth mini', 'laptop stand',
  'ring light selfie', 'action camera murah', 'tempat bumbu set', 'gelas minum tumbler',
  'diffuser aromatherapy', 'organizer laci', 'vacuum cleaner mini', 'toner wajah',
  'pelembab muka', 'bedak tabur', 'maskara waterproof', 'body lotion',
  'kaos polos premium', 'topi baseball', 'gelang titanium', 'kacamata anti radiasi',
  'jam tangan digital', 'hardcase handphone', 'tripod hp', 'mic clip on',
  'led strip dekorasi', 'alas mouse gaming',
];

export const keywords: Keyword[] = keywordBase.map((kw, i) => {
  const seed = i * 11 + 5;
  const compLevels: Array<'low' | 'medium' | 'high'> = ['low', 'medium', 'high'];
  return {
    keyword: kw,
    volume: Math.floor(sr(seed) * 80000) + 5000,
    competition: compLevels[Math.floor(sr(seed + 1) * 3)],
    yourRank: sr(seed + 2) > 0.3 ? Math.floor(sr(seed + 3) * 50) + 1 : null,
    opportunityScore: Math.floor(sr(seed + 4) * 100),
    trend: Array.from({ length: 7 }, (_, j) => Math.floor(sr(seed + 10 + j) * 30000) + 5000),
  };
});

// ============================================================
// COMPETITORS (5)
// ============================================================
export const competitors: Competitor[] = [
  { id: 'COMP-001', name: 'TokoMaju Digital', platform: 'Tokopedia', productCount: 340, avgPrice: 125000, rating: 4.7, topKeywords: ['kemeja pria slim fit', 'celana chino', 'kaos polos premium'] },
  { id: 'COMP-002', name: 'GadgetZone Store', platform: 'Shopee', productCount: 520, avgPrice: 185000, rating: 4.5, topKeywords: ['earbuds bluetooth', 'power bank fast charge', 'charger multi port'] },
  { id: 'COMP-003', name: 'HomeStyle Official', platform: 'Lazada', productCount: 210, avgPrice: 89000, rating: 4.8, topKeywords: ['rak dapur minimalis', 'lampu led smart', 'organizer laci'] },
  { id: 'COMP-004', name: 'BeautyLab ID', platform: 'Shopee', productCount: 180, avgPrice: 75000, rating: 4.6, topKeywords: ['serum wajah', 'sunscreen murah', 'toner wajah'] },
  { id: 'COMP-005', name: 'FashionHub Co', platform: 'Tokopedia', productCount: 410, avgPrice: 155000, rating: 4.4, topKeywords: ['blazer casual', 'sneakers putih', 'jaket bomber'] },
];

// ============================================================
// NOTIFICATIONS (8)
// ============================================================
export const notifications: AppNotification[] = [
  { id: 'N-001', type: 'sales_drop', message: 'Penjualan hari ini turun 24% dibanding kemarin. Periksa performa listing Anda.', read: false, createdAt: '2025-06-12T08:30:00Z' },
  { id: 'N-002', type: 'ab_significant', message: 'A/B Test "Landing Page V2" telah mencapai signifikansi statistik (p=0.034).', read: false, createdAt: '2025-06-11T14:00:00Z' },
  { id: 'N-003', type: 'competitor_new', message: 'Kompetitor baru terdeteksi di keyword "earbuds bluetooth" — GadgetPro Store.', read: false, createdAt: '2025-06-11T10:15:00Z' },
  { id: 'N-004', type: 'forecast_drop', message: 'Prediksi permintaan minggu depan turun 12% untuk kategori Fashion.', read: true, createdAt: '2025-06-10T16:00:00Z' },
  { id: 'N-005', type: 'system', message: 'Laporan bulanan Mei 2025 telah siap diunduh.', read: true, createdAt: '2025-06-01T09:00:00Z' },
  { id: 'N-006', type: 'sales_drop', message: 'Produk "Serum Vitamin C" mengalami penurunan pesanan 35% dalam 7 hari terakhir.', read: true, createdAt: '2025-05-28T11:30:00Z' },
  { id: 'N-007', type: 'system', message: 'Fitur baru: Cohort Analysis kini tersedia di menu Konsultan Bisnis.', read: true, createdAt: '2025-05-25T08:00:00Z' },
  { id: 'N-008', type: 'ab_significant', message: 'A/B Test "Deskripsi Produk" selesai. Variasi B unggul 8.3%.', read: true, createdAt: '2025-05-20T15:45:00Z' },
];

// ============================================================
// STORES
// ============================================================
export const stores: Store[] = [
  { id: 'STORE-001', name: 'Ecommetrics Official', platform: 'tokopedia', category: 'Fashion & Elektronik', status: 'active' },
];

// ============================================================
// 30-DAY SALES TRENDS (for dashboard chart)
// ============================================================
export const salesTrends = Array.from({ length: 30 }, (_, i) => {
  const seed = i * 17 + 42;
  return {
    date: `Hari ${i + 1}`,
    sales: Math.floor(sr(seed) * 5000000) + 2000000,
    orders: Math.floor(sr(seed + 1) * 200) + 80,
    aov: Math.floor(sr(seed + 2) * 100000) + 150000,
  };
});

// ============================================================
// TOP PRODUCTS (pre-aggregated for dashboard)
// ============================================================
export const topProducts = products.slice(0, 10).map((p, i) => {
  const seed = i * 23 + 9;
  const units = Math.floor(sr(seed) * 1500) + 200;
  return {
    id: i + 1,
    name: p.name,
    sku: p.sku,
    category: p.category,
    units,
    revenue: units * p.price,
    revenueFormatted: `Rp ${(units * p.price).toLocaleString('id-ID')}`,
    share: Math.floor(sr(seed + 1) * 15) + 3,
    trend: Array.from({ length: 7 }, (_, j) => Math.floor(sr(seed + 10 + j) * 80) + 20),
  };
});

// ============================================================
// KEYWORD DATA (for marketplace charts)
// ============================================================
export const keywordData = keywords.slice(0, 8).map(kw => ({
  keyword: kw.keyword.split(' ').slice(0, 2).join(' '),
  volume: kw.volume,
  competition: Math.floor(sr(kw.volume) * 100),
}));

// ============================================================
// SCATTER DATA (for consultant ad spend vs revenue)
// ============================================================
export const scatterData = Array.from({ length: 50 }, (_, i) => {
  const seed = i * 31 + 7;
  const adSpend = Math.floor(sr(seed) * 10000) + 1000;
  const baseRevenue = adSpend * 4;
  const noise = Math.floor(sr(seed + 1) * 10000) - 5000;
  return {
    adSpend,
    revenue: Math.max(5000, baseRevenue + noise),
  };
});

// ============================================================
// FORECAST DATA
// ============================================================
export const forecastData: ForecastPoint[] = (() => {
  const points: ForecastPoint[] = [];
  for (let w = 0; w < 16; w++) {
    const seed = w * 19 + 11;
    const base = 5000000 + Math.floor(sr(seed) * 3000000);
    const seasonal = Math.sin(w / 4) * 1000000;
    const val = Math.floor(base + seasonal);
    if (w < 8) {
      points.push({ week: `Minggu ${w + 1}`, actual: val, forecast: val, lower: val, upper: val });
    } else {
      const noise = Math.floor(sr(seed + 2) * 500000);
      points.push({
        week: `Minggu ${w + 1}`,
        actual: null,
        forecast: val,
        lower: val - 800000 - noise,
        upper: val + 800000 + noise,
      });
    }
  }
  return points;
})();

// ============================================================
// COHORT DATA (12 months)
// ============================================================
export const cohortData: CohortRow[] = Array.from({ length: 12 }, (_, monthIdx) => {
  const cohortLabel = (() => {
    const d = new Date('2025-06-01');
    d.setMonth(d.getMonth() - (11 - monthIdx));
    return d.toLocaleDateString('id-ID', { month: 'short', year: 'numeric' });
  })();
  const months = Array.from({ length: 12 - monthIdx }, (__, colIdx) => {
    if (colIdx === 0) return 100;
    const decay = Math.pow(0.7, colIdx);
    const noise = sr(monthIdx * 100 + colIdx * 7) * 10 - 5;
    return Math.max(5, Math.min(100, Math.round(decay * 100 + noise)));
  });
  return { cohort: cohortLabel, months };
});

// ============================================================
// ELASTICITY DATA
// ============================================================
export const elasticityData: ElasticityPoint[] = Array.from({ length: 10 }, (_, i) => {
  const price = 50000 + i * 25000;
  const baseDemand = 500 - i * 45;
  const noise = Math.floor(sr(i * 13) * 20) - 10;
  return { price, demand: Math.max(30, baseDemand + noise) };
});

// ============================================================
// SALES HEATMAP DATA
// ============================================================
export const salesHeatmap: SalesHeatmapCell[] = (() => {
  const cells: SalesHeatmapCell[] = [];
  for (let day = 0; day < 7; day++) {
    for (let hour = 0; hour < 24; hour++) {
      const seed = day * 100 + hour;
      let baseCount = 5;
      if (hour >= 10 && hour <= 15) baseCount = 15;
      if (hour >= 19 && hour <= 22) baseCount = 12;
      if (day >= 5) baseCount *= 0.7;
      const count = Math.floor(baseCount + sr(seed) * 10);
      cells.push({ day, hour, count });
    }
  }
  return cells;
})();

// ============================================================
// KPI METRICS (for dashboard)
// ============================================================
export const kpiMetrics: KpiMetric[] = [
  {
    label: 'Total Pendapatan (MTD)',
    value: 124500000,
    formattedValue: 'Rp 124,5M',
    delta: 12.5,
    sparkline: [85, 92, 78, 105, 95, 110, 120],
  },
  {
    label: 'Total Pesanan',
    value: 3842,
    formattedValue: '3.842',
    delta: 5.2,
    sparkline: [320, 340, 310, 380, 350, 390, 400],
  },
  {
    label: 'Rata-rata Transaksi',
    value: 324200,
    formattedValue: 'Rp 324,2K',
    delta: -1.1,
    sparkline: [330, 320, 340, 310, 325, 315, 324],
  },
  {
    label: 'Tingkat Konversi',
    value: 3.8,
    formattedValue: '3,8%',
    delta: 0.4,
    sparkline: [3.2, 3.5, 3.3, 3.8, 3.6, 3.9, 3.8],
  },
  {
    label: 'Tingkat Pengembalian',
    value: 2.1,
    formattedValue: '2,1%',
    delta: -0.3,
    sparkline: [2.5, 2.3, 2.4, 2.2, 2.0, 2.1, 2.1],
  },
  {
    label: 'Pendapatan Bersih',
    value: 112050000,
    formattedValue: 'Rp 112M',
    delta: 14.1,
    sparkline: [75, 82, 70, 95, 88, 100, 112],
  },
];

// ============================================================
// INVOICE RECORDS
// ============================================================
export const invoices: InvoiceRecord[] = [
  { id: 'INV-001', date: '2025-06-01', plan: 'Pro', amount: 499000, status: 'paid' },
  { id: 'INV-002', date: '2025-05-01', plan: 'Pro', amount: 499000, status: 'paid' },
  { id: 'INV-003', date: '2025-04-01', plan: 'Starter', amount: 199000, status: 'paid' },
  { id: 'INV-004', date: '2025-03-01', plan: 'Starter', amount: 199000, status: 'paid' },
  { id: 'INV-005', date: '2025-02-01', plan: 'Starter', amount: 199000, status: 'paid' },
  { id: 'INV-006', date: '2025-01-01', plan: 'Gratis', amount: 0, status: 'paid' },
];

// ============================================================
// API KEYS
// ============================================================
export const apiKeys: ApiKey[] = [
  { id: 'KEY-001', name: 'Production Key', key: 'dk_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6', maskedKey: 'dk_live_a1b2****o5p6', createdAt: '2025-04-15', lastUsed: '2025-06-12', status: 'active' },
  { id: 'KEY-002', name: 'Development Key', key: 'dk_test_z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4', maskedKey: 'dk_test_z9y8****l5k4', createdAt: '2025-03-01', lastUsed: '2025-06-10', status: 'active' },
];