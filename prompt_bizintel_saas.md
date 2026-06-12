# CLI Agent Prompt — B2B SaaS Business Intelligence Platform (web-kbt)

## CONTEXT: EXISTING PROJECT

This is a **continuation task on an existing Next.js project** named `web-kbt`.
Do NOT scaffold a new project. Work inside the existing codebase.

**What already exists:**
```
web-kbt/
├── app/
│   ├── consultant/page.tsx     ← exists, needs expansion
│   ├── marketplace/page.tsx    ← exists, needs expansion
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                ← exists (main dashboard), has 4 TS errors
├── lib/
│   └── mockData.ts             ← exists, needs expansion
├── CLAUDE.md
├── AGENTS.md
└── [standard Next.js config files]
```

**STEP 0 — Fix existing TypeScript errors before doing anything else:**

1. `Cannot find module '../lib/mockData'` in `app/page.tsx`:
   - Verify `lib/mockData.ts` has named exports matching the imports in `app/page.tsx`
   - Check `tsconfig.json` — ensure `paths` or `baseUrl` is not conflicting
   - If the import path is wrong, correct it to match the actual export structure

2. Recharts `Tooltip` formatter type error (`ts2322`):
   - Fix by typing the formatter as: `formatter={(value: number | string) => [typeof value === 'number' ? \`Rp \${value.toLocaleString('id-ID')}\` : value, 'Penjualan']}`
   - Or cast: `(value as number).toLocaleString('id-ID')`

3. Implicit `any` on `product` and `idx` parameters in map:
   - Add explicit types from `lib/mockData.ts` exports

Run `npx tsc --noEmit` after each fix. Proceed only when **0 errors** remain.

---

## PROJECT OVERVIEW

This is a **B2B SaaS Business Intelligence platform** — a data-driven intelligence suite for Indonesian UMKM and online marketplace sellers (Shopee, Tokopedia, Lazada). It converts raw sales activity into forecasts, SEO scoring, and customer intelligence.

**App display name:** DataNiaga  
**Tagline:** *"Jual Lebih Cerdas, Bukan Lebih Keras."*

---

## TECH STACK

**Already installed (do not reinstall unless missing):**
- Next.js (App Router), TypeScript, Tailwind CSS, Recharts

**Install if not present:**
```bash
npm install zustand @tanstack/react-query react-hook-form zod next-themes
npm install lucide-react class-variance-authority clsx tailwind-merge
npx shadcn@latest init   # if not already initialized
npx shadcn@latest add button card badge input select dialog sheet tabs \
  dropdown-menu toast skeleton progress separator avatar popover
```

---

## DESIGN SYSTEM

Define these in `globals.css` as CSS variables and extend `tailwind.config.ts`:

**Color Palette:**
- Primary: `#0F4C81` (deep navy)
- Accent: `#00C49A` (teal-green — positive metrics)
- Danger: `#EF4444`
- Warning: `#F59E0B`
- Background: `#F8FAFC`
- Surface: `#FFFFFF`
- Text primary: `#0F172A`
- Text muted: `#64748B`

**Typography (via `next/font/google`):**
- Display/Headings: `Plus Jakarta Sans` (700, 800)
- Body: `Inter` (400, 500)
- Data/numbers: `JetBrains Mono` (400)

**Tokens:**
- Card radius: `0.75rem`, Input radius: `0.5rem`, Badge radius: `9999px`
- Shadows: `shadow-sm` default, `shadow-md` modals

---

## FOLDER STRUCTURE (target state)

Extend the existing project to this structure. Do NOT rename or delete existing files — only expand them:

```
/app
  /(auth)/
    login/page.tsx
    register/page.tsx
    forgot-password/page.tsx
  /marketplace/
    page.tsx                    ← EXISTING — expand into full Marketplace Overview
    keywords/page.tsx
    listing-analyzer/page.tsx
    competitor-tracker/page.tsx
  /consultant/
    page.tsx                    ← EXISTING — expand into Analytics Overview
    forecasting/page.tsx
    customer-segments/page.tsx
    ab-testing/page.tsx
    cohort/page.tsx
    price-elasticity/page.tsx
  /reports/
    page.tsx
  /settings/
    page.tsx                    ← redirects to /settings/profile
    profile/page.tsx
    stores/page.tsx
    notifications/page.tsx
    billing/page.tsx
    api-keys/page.tsx
  /onboarding/
    page.tsx
  globals.css                   ← EXISTING — add design tokens
  layout.tsx                    ← EXISTING — replace with full layout shell
  page.tsx                      ← EXISTING — fix errors, then expand into Sales Dashboard

/components
  /layout/
    Sidebar.tsx
    Navbar.tsx
    MobileNav.tsx
    StoresSwitcher.tsx
    NotificationBell.tsx
  /charts/
    AreaChart.tsx               ← Recharts wrapper with gradient + tooltip
    DonutChart.tsx
    SparklineChart.tsx
    HeatmapChart.tsx
    ScatterPlot.tsx
    ForecastChart.tsx           ← actuals + dashed forecast + confidence band
    CohortTable.tsx             ← heatmap grid using CSS + data
    NormalCurveChart.tsx        ← A/B test distribution visual
  /modules/
    /dashboard/
      KpiCard.tsx
      RevenueChart.tsx
      TopProductsTable.tsx
      ProductDetailDrawer.tsx
      RevenueBreakdown.tsx
      SalesHeatmap.tsx
      GoalTracker.tsx
    /marketplace/
      ListingAnalyzer.tsx
      ScoreGauge.tsx
      KeywordTable.tsx
      CompetitorTable.tsx
      KeywordGapVenn.tsx
    /consultant/
      ForecastPanel.tsx
      RfmScatterPlot.tsx
      SegmentDetailPanel.tsx
      ChurnTable.tsx
      AbTestSetup.tsx
      AbTestResult.tsx
      CohortHeatmap.tsx
      ElasticityChart.tsx
    /reports/
      ReportBuilder.tsx
      ExecutiveSummary.tsx
    /settings/
      ProfileForm.tsx
      StoreCard.tsx
      NotificationPrefs.tsx
      BillingPlan.tsx
  /ai/
    AiAssistantButton.tsx       ← floating button bottom-right
    AiChatPanel.tsx             ← slide-up chat panel

/lib
  mockData.ts                   ← EXISTING — expand with all data shapes
  types.ts                      ← all shared TypeScript interfaces
  constants.ts
  utils.ts                      ← cn(), formatRp(), formatNumber(), etc.
  /hooks/
    useSalesData.ts
    useMarketplaceData.ts
    useAnalyticsData.ts
    useStore.ts                 ← Zustand store
```

---

## MOCK DATA LAYER

**All data is dummy/hardcoded. No backend. No real API calls (except Anthropic AI assistant).**

Expand `lib/mockData.ts` to export these typed datasets:

```typescript
// lib/types.ts — define all interfaces here first
export interface Product { id: string; name: string; sku: string; category: string; price: number; }
export interface SaleRecord { date: string; productId: string; channel: 'shopee'|'tokopedia'|'lazada'; qty: number; revenue: number; }
export interface Customer { id: string; name: string; totalSpend: number; orderCount: number; lastOrderDate: string; }
export interface Keyword { keyword: string; volume: number; competition: 'low'|'medium'|'high'; yourRank: number|null; opportunityScore: number; trend: number[]; }
export interface Competitor { id: string; name: string; platform: string; productCount: number; avgPrice: number; rating: number; topKeywords: string[]; }
export interface Notification { id: string; type: string; message: string; read: boolean; createdAt: string; }
```

Data scale (keep it light, just enough to look realistic):
- `products`: 20 items, 4 categories (fashion, elektronik, rumah tangga, kecantikan)
- `salesRecords`: 365 days × ~15 records/day = ~5000 rows (generate programmatically with a seeded loop, no need to hardcode each row)
- `customers`: 150 unique customers
- `keywords`: 50 keywords
- `competitors`: 5 competitors
- `notifications`: 8 pre-seeded notifications

Use a simple deterministic generator — multiply index by a prime, modulo range. No external seed library needed.

All Rupiah values: use `toLocaleString('id-ID')` — Indonesian format uses `.` as thousand separator.

**Data access pattern** — wrap in hooks with simulated async delay:
```typescript
// lib/hooks/useSalesData.ts
export function useSalesData() {
  const [data, setData] = useState<SaleRecord[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setData(mockSalesRecords);
      setLoading(false);
    }, 400); // simulate network
    return () => clearTimeout(timer);
  }, []);
  return { data, loading };
}
```

---

## LAYOUT SHELL

Replace `app/layout.tsx` with the full shell. Keep `app/globals.css` but add design tokens.

**Sidebar (desktop, left, collapsible):**
```
[Logo: DataNiaga]
─────────────────
[icon] Overview          → /
[icon] Marketplace       → /marketplace
  └ Keywords             → /marketplace/keywords
  └ Listing Analyzer     → /marketplace/listing-analyzer
  └ Competitor Tracker   → /marketplace/competitor-tracker
[icon] Konsultan Bisnis  → /consultant
  └ Forecasting          → /consultant/forecasting
  └ Segmentasi           → /consultant/customer-segments
  └ A/B Testing          → /consultant/ab-testing
  └ Cohort               → /consultant/cohort
  └ Elastisitas Harga    → /consultant/price-elasticity
[icon] Laporan           → /reports
─────────────────
[icon] Pengaturan        → /settings/profile
```

Sidebar state (expanded/collapsed) stored in Zustand. Collapsed = icon-only mode (48px width).

**Top Navbar:**
- Left: Hamburger (mobile) or page title (desktop)
- Center: Store switcher dropdown (max 5 stores; active store name shown)
- Right: Dark mode toggle | Notification bell (badge count) | Avatar dropdown (Profile, Logout)

**Mobile bottom tab bar (visible on <768px, hides sidebar):**
5 tabs: Overview | Marketplace | Konsultan | Laporan | Pengaturan

---

## MODULE 1 — SALES DASHBOARD (`app/page.tsx`)

Fix the existing errors in this file, then expand it to include all sections below.

### 1.1 KPI Cards (top row, 3-col grid)
| Metric | Format | Delta |
|---|---|---|
| Total Pendapatan (MTD) | `Rp 12.450.000` | % vs bulan lalu |
| Total Pesanan | Integer | % vs bulan lalu |
| Rata-rata Nilai Transaksi (AOV) | `Rp` | % vs bulan lalu |
| Tingkat Pengembalian | `%` | Arrow + color |
| Tingkat Konversi | `%` | Arrow + color |
| Pendapatan Bersih | `Rp` | % vs bulan lalu |

Each card: animated count-up on mount (`useEffect` + `requestAnimationFrame`), sparkline (7-day), delta badge (green if positive, red if negative).

### 1.2 Revenue Trend Chart
- Type: `AreaChart` (Recharts) with gradient fill (`linearGradient` SVG def)
- Period toggle: `7H | 30H | 90H | 12B` (hari/bulan)
- Series toggle checkboxes: Pendapatan | Pesanan | AOV
- Tooltip: date + values formatted in Rupiah
- Export button (PNG via `canvas.toDataURL`)

### 1.3 Top Products Table
Columns: `#` | Nama Produk | SKU | Terjual | Pendapatan | Share % | Tren
- Client-side sort on all numeric columns
- Search input filters by name
- Pagination: 10 rows/page with prev/next
- Row click opens `ProductDetailDrawer` (Sheet component, slides from right)

### 1.4 Product Detail Drawer (Sheet)
Content:
- Header: product name + category badge
- 30-day area chart for that product
- Breakdown bar: Shopee % | Tokopedia % | Lazada %
- Rating display (mock: ★ 4.6 · 234 ulasan)
- Insight card: "Produk ini memiliki risiko churn 23%. Pertimbangkan flash sale."

### 1.5 Revenue Breakdown (Donut + tabs)
Two tabs: "Per Kategori" | "Per Platform"
Each tab shows a Recharts `PieChart` with custom legend list on the right.

### 1.6 Sales Heatmap
7 rows (Mon–Sun) × 24 cols (0–23h). Cell background uses opacity of the accent color proportional to order count. Tooltip on hover. Footer callout: "Peak: Selasa 14.00–15.00 (avg 18 pesanan)."

### 1.7 Goal Tracker
- Two progress bars: Revenue goal (%) and Order goal (%)
- Input fields to set goals (stored in Zustand, persisted to `localStorage`)
- If <60% of month elapsed but <40% of goal reached → yellow warning banner

---

## MODULE 2 — MARKETPLACE OPTIMIZATION

### `app/marketplace/page.tsx` — Overview
- Summary cards: Total Keywords Tracked | Avg Listing Score | Competitors Monitored
- SEO Score trend line chart (top 3 products over 30 days)
- Link cards to sub-pages

### `app/marketplace/listing-analyzer/page.tsx`
Textarea for title input + textarea for description input.
On "Analisis" button click (client-side, no API):

Score computation (pure JS rules, no real NLP):
- Title Length (0–20): optimal 60–80 chars
- Keyword Density (0–20): check if title contains any keyword from a hardcoded list
- Emotional Triggers (0–20): check for words like "promo", "murah", "gratis", "terbaik", "ori"
- Specificity (0–20): check for numbers, colors, material words
- Readability (0–20): penalize ALL CAPS ratio >20%, reward title-case

Display: radial gauge SVG (score / 100) + score breakdown table + feedback strings.
"Tulis Ulang dengan AI" button → calls Anthropic API (Module 6).

### `app/marketplace/keywords/page.tsx`
Table of 50 mock keywords with: keyword | volume | competition badge | your rank | opportunity score | 7-day sparkline trend.
Features: search filter, sort by volume/opportunity, "Tambah Keyword" modal (adds to local state).

### `app/marketplace/competitor-tracker/page.tsx`
Table of 5 mock competitors + "Tambah Kompetitor" modal (adds dummy entry to local state).
Below table: Price Gap Analysis — bar chart comparing your avg price vs each competitor per category.
Insight callout: "Kompetitor B menjual 12% lebih murah di kategori Fashion."

Keyword Gap section: two-column list — "Keywords mereka, bukan kamu" (sorted by volume).

---

## MODULE 3 — KONSULTAN BISNIS

### `app/consultant/page.tsx` — Overview
- Summary: 4 insight cards (forecast trend, top segment, churn count, last A/B test result)
- Quick navigation cards to sub-pages

### `app/consultant/forecasting/page.tsx`
- Dropdowns: select product + select horizon (30/60/90 hari)
- `ForecastChart`: Recharts `ComposedChart` with:
  - Solid `Line` for historical actuals
  - Dashed `Line` for forecast (use `strokeDasharray`)
  - Shaded `Area` between upper/lower confidence bounds
- Below chart: weekly forecast table (week label | forecast | lower | upper)
- Accuracy metrics row: `MAE`, `RMSE`, `MAPE` — computed from mock values
- Alert banner if any forecast week is >20% below last month avg

Mock forecast generation: take last 90 days of a product's sales, add a seasonal multiplier + small noise for future weeks.

### `app/consultant/customer-segments/page.tsx`
Two panels side-by-side (stacked on mobile):

**Left — RFM Scatter Plot:**
- Recharts `ScatterChart`, X = Frequency, Y = Monetary, Z (size) = Recency score
- Each point colored by segment (Champions → green, At Risk → orange, Lost → red, etc.)
- Legend with segment names

**Right — Segment Summary Table:**
Segment | Jumlah | Avg Revenue | Avg Interval | Rekomendasi Aksi
- Click row → `SegmentDetailPanel` (Sheet) showing top 10 customers in that segment

### `app/consultant/ab-testing/page.tsx`
**Setup form:**
- Experiment name input
- Metric selector (Revenue | Conversion | AOV)
- Group A: sample size + conversions (or total revenue)
- Group B: sample size + conversions (or total revenue)
- "Hitung Signifikansi" button

**Output (all mocked computation using simple formulas):**
- p-value (calculate a basic z-test: `z = (p1-p2)/sqrt(p*(1-p)*(1/n1+1/n2))`, then look up z in a hardcoded normal distribution table)
- Verdict string: significant or not
- Two overlapping normal curves (SVG, draw programmatically using path bezier approximation)
- Confidence interval for the difference

### `app/consultant/cohort/page.tsx`
- Build cohort table from mock `salesRecords`:
  - Row = acquisition month (customer's first purchase month)
  - Column = Month 0, 1, 2, ... 11
  - Cell = retention % (mock with declining curve + noise)
- Render as a CSS grid where `background-color` uses `rgba(0, 196, 154, opacity)` — green intensity = retention
- Row averages in last column
- Summary callout: "Rata-rata retensi bulan ke-3: 34%"

### `app/consultant/price-elasticity/page.tsx`
- Select product dropdown
- Display mock elasticity coefficient (e.g., `-0.82`)
- Plain language: "Kenaikan harga 10% diperkirakan mengurangi volume ~8.2%. Dampak pendapatan bersih: +1.6%."
- Recharts `LineChart` showing demand curve (price on X, quantity on Y) — use 10 mocked price-volume pairs

---

## MODULE 4 — LAPORAN (`app/reports/page.tsx`)

### Report Builder
- Checkboxes: which modules to include (Sales | Marketplace | Konsultan)
- Date range picker (two date inputs)
- Preview pane: renders a styled `<div>` with all selected sections using real mock data
- "Unduh PDF" button: calls `window.print()` with a `@media print` CSS that hides everything except the preview pane
- "Ekspor CSV" button: constructs a CSV string from mock sales data and triggers download via `Blob` + `URL.createObjectURL`

### Executive Summary Card
Auto-generated text string built from mock data:
`"Pada [bulan ini], toko Anda menghasilkan Rp X, naik Y% dari bulan sebelumnya. Produk terbaik: [nama]. Perhatian: [metrik] menunjukkan penurunan."`

Shareable link: copy button that copies `window.location.href` + a mocked `?share=xxx` param.

---

## MODULE 5 — SETTINGS

### `app/settings/profile/page.tsx`
Form fields: Nama | Email | Nomor HP | Bahasa (select: ID/EN) | Zona Waktu (select)
Avatar: click to show file input (UI only, no actual upload — show preview using `FileReader`)
"Simpan Perubahan" button → success toast

### `app/settings/stores/page.tsx`
List of connected stores (mock: 1 active store).
Each store card: platform logo placeholder | store name | category | status badge | "Hapus" button.
"Tambah Toko" modal: platform picker (3 buttons: Shopee/Tokopedia/Lazada) + name input. Max 5 stores enforced in UI.

### `app/settings/notifications/page.tsx`
Toggle list per notification type:
- Penjualan turun >20% hari ini
- Prediksi permintaan turun pekan depan
- A/B test mencapai signifikansi
- Kompetitor baru terdeteksi di keyword X

Threshold sliders (e.g., "Alert jika penjualan turun lebih dari [X]%"). State in Zustand.

### `app/settings/billing/page.tsx`
3-column plan cards: Gratis | Starter (Rp 199K/bln) | Pro (Rp 499K/bln)
Feature comparison rows. "Upgrade" CTA button (UI only).
Invoice history table: 6 mocked rows.

### `app/settings/api-keys/page.tsx`
Table: Key Name | Created | Last Used | Status
"Buat Key Baru" button → modal with name input → adds a masked key to local state.
Masked key: `dk_live_****...****` with copy button that shows the "full" mocked key once.

---

## MODULE 6 — AI ASSISTANT (Anthropic API)

### Floating Button
Fixed position bottom-right: `fixed bottom-6 right-6 z-50`
Navy circle button, Sparkles icon (Lucide).
Click toggles `AiChatPanel`.

### `AiChatPanel`
- Slides up from bottom (CSS transition `transform translateY`)
- Header: "DataNiaga AI" + close button
- Message list with timestamps, user bubbles (right, navy) and AI bubbles (left, white)
- Input bar at bottom: textarea + send button
- Streaming: use `fetch` with `ReadableStream` to stream the Anthropic API response

**System prompt to pass:**
```
You are DataNiaga AI, a business intelligence advisor for Indonesian UMKM online sellers.
You speak in informal but professional Bahasa Indonesia.
You give concise, numbered action plans. Never give vague advice.
Current dashboard context: {inject live KPI snapshot as JSON}
```

**Four built-in quick-action buttons (shown when chat is empty):**
1. 📝 "Tulis ulang judul produkku" → populates textarea
2. 📊 "Jelaskan tren penjualan bulan ini"
3. ❓ "Kenapa penjualanku turun minggu lalu?"
4. 🎯 "Strategi naik revenue 20% bulan depan"

**Implementation:**
```typescript
const response = await fetch('/api/ai/chat', { method: 'POST', body: JSON.stringify({ messages, context }) });
// Create app/api/ai/chat/route.ts as a Next.js Route Handler
// Route Handler calls: fetch('https://api.anthropic.com/v1/messages', { ... })
// Use claude-sonnet-4-6, max_tokens: 1000, stream: true
// Forward the stream back to the client
```

---

## MODULE 7 — ONBOARDING (`app/onboarding/page.tsx`)

Multi-step wizard. Store step in local state (not URL). Show only on first visit (check `localStorage.getItem('onboarded')`).

Steps:
1. **Selamat datang** — headline + subtext + "Mulai" button
2. **Pilih Platform** — 3 large buttons: Shopee | Tokopedia | Lazada (multi-select)
3. **Nama Toko** — text input
4. **Data Awal** — two options: "Upload CSV" (UI only, no processing) OR "Gunakan data contoh" (recommended, always use this for MVP)
5. **Target Bulanan** — revenue input + order count input
6. **Selesai** — confetti animation (use `canvas-confetti` npm package) → set `localStorage.onboarded = true` → redirect to `/`

Top: step progress bar (filled segments). Bottom: Back + Next/Selesai buttons. Skip link on steps 2–5.

---

## GLOBAL UI PATTERNS

### Loading States
Every data-dependent section must show a `Skeleton` component while `loading === true`. Use shadcn `Skeleton`. Never show a full-page spinner.

### Empty States
When data array is empty, render:
```tsx
<div className="flex flex-col items-center gap-3 py-16 text-muted-foreground">
  <SomeIcon className="w-12 h-12 opacity-30" />
  <p className="font-medium">Belum ada data</p>
  <p className="text-sm">Mulai dengan menambahkan toko pertamamu.</p>
  <Button variant="outline" size="sm">Tambah Toko</Button>
</div>
```

### Toast Notifications
Use shadcn `toast` / `useToast`. Four variants: success (green), error (red), warning (yellow), info (blue). All form submissions + user actions trigger appropriate toasts.

### Dark Mode
`next-themes` Provider in `app/layout.tsx`. Toggle button in Navbar. All components use Tailwind's `dark:` prefix for background/text/border variants.

### Responsive
- Desktop (≥1280px): sidebar visible, 3-col KPI grid
- Tablet (768–1279px): sidebar collapsed (icon-only), 2-col KPI grid
- Mobile (<768px): sidebar hidden, bottom tab bar, 1-col KPI grid, charts full-width

---

## UTILITY FUNCTIONS (`lib/utils.ts`)

```typescript
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

export function formatRp(value: number): string {
  return `Rp ${value.toLocaleString('id-ID')}`;
}

export function formatDelta(current: number, previous: number): { value: string; positive: boolean } {
  const pct = ((current - previous) / previous) * 100;
  return { value: `${pct >= 0 ? '+' : ''}${pct.toFixed(1)}%`, positive: pct >= 0 };
}

export function generateDateRange(days: number): string[] {
  // Returns array of 'YYYY-MM-DD' strings for the past N days
}
```

---

## ZUSTAND STORE (`lib/hooks/useStore.ts`)

```typescript
interface AppStore {
  activeStore: string;
  setActiveStore: (id: string) => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  revenueGoal: number;
  orderGoal: number;
  setGoals: (revenue: number, orders: number) => void;
  notifications: Notification[];
  markAllRead: () => void;
}
```

---

## TYPESCRIPT RULES

- Zero `any` types anywhere. Use `unknown` + type guard if necessary.
- All component props have explicit interfaces.
- All mock data functions return typed arrays.
- `tsconfig.json` must have `"strict": true`.
- Run `npx tsc --noEmit` — must pass with 0 errors before marking any module done.
- No unused imports (ESLint `no-unused-vars` rule enforced).

---

## IMPLEMENTATION ORDER

Execute in this exact sequence. Each step must result in a buildable (`npm run dev` with no crash) state before proceeding:

1. **STEP 0** — Fix all 4 TypeScript errors in `app/page.tsx` + `lib/mockData.ts`. Verify 0 errors.
2. **Deps** — Install missing packages (check `package.json` first to avoid reinstalling).
3. **Foundation** — `lib/types.ts`, `lib/utils.ts`, `lib/constants.ts`
4. **Mock data** — Expand `lib/mockData.ts` with all datasets; create all hooks in `lib/hooks/`
5. **Design tokens** — Update `globals.css` + `tailwind.config.ts` with color palette + fonts
6. **Layout shell** — `app/layout.tsx`, `Sidebar.tsx`, `Navbar.tsx`, `MobileNav.tsx` (Zustand store connected)
7. **Auth pages** — `/login`, `/register`, `/forgot-password` (UI only, mock credentials)
8. **Onboarding** — `app/onboarding/page.tsx` (full wizard with confetti)
9. **Module 1** — Expand `app/page.tsx` (Sales Dashboard — all 7 sub-sections)
10. **Module 2** — Expand `app/marketplace/page.tsx` + 3 sub-pages
11. **Module 3** — Expand `app/consultant/page.tsx` + 5 sub-pages
12. **Module 4** — `app/reports/page.tsx`
13. **Module 5** — All 5 settings pages
14. **Module 6** — AI assistant (floating button + chat panel + `/api/ai/chat` route)
15. **Dark mode pass** — Verify all pages look correct in dark mode
16. **Mobile pass** — Test all pages at 375px width, fix any overflow/layout issues
17. **Empty + loading states pass** — Ensure every data section has skeleton + empty state
18. **Final** — `npx tsc --noEmit` + `npm run lint` — both must pass clean

---

## AGENT RULES

- **No Lorem Ipsum.** All copy must be realistic Indonesian business language.
- **No backend.** All data is from `lib/mockData.ts`. The ONLY external network call is to Anthropic API (Module 6).
- **No actual statistical computation.** Forecast, p-values, elasticity = deterministic mock values derived from the seed data.
- **Component size limit:** 200 lines max per file. Extract aggressively into sub-components.
- **No inline styles** except where Tailwind cannot express it (e.g., SVG attributes).
- **After each module**, confirm the app runs with `npm run dev` and no console errors before moving to next.
