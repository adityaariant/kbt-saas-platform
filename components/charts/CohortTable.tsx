'use client';

interface CohortRow { cohort: string; months: number[]; }
interface CohortTableProps { data: CohortRow[]; }

export function CohortTable({ data }: CohortTableProps) {
  const maxCols = Math.max(...data.map((r) => r.months.length));
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr>
            <th className="px-3 py-2 text-left text-text-muted font-semibold sticky left-0 bg-surface z-10">Kohort</th>
            {Array.from({ length: maxCols }, (_, i) => (
              <th key={i} className="px-3 py-2 text-center text-text-muted font-semibold">M{i}</th>
            ))}
            <th className="px-3 py-2 text-center text-text-muted font-semibold">Avg</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            const avg = row.months.length > 0 ? Math.round(row.months.reduce((a, b) => a + b, 0) / row.months.length) : 0;
            return (
              <tr key={row.cohort}>
                <td className="px-3 py-2 font-medium text-text-secondary whitespace-nowrap sticky left-0 bg-surface z-10">{row.cohort}</td>
                {Array.from({ length: maxCols }, (_, i) => {
                  const val = row.months[i];
                  if (val === undefined) return <td key={i} className="px-3 py-2" />;
                  const opacity = val / 100;
                  return (
                    <td key={i} className="px-3 py-2 text-center font-mono font-medium" style={{ backgroundColor: `rgba(0, 196, 154, ${opacity})`, color: opacity > 0.5 ? 'white' : 'var(--text-primary)' }}>
                      {val}%
                    </td>
                  );
                })}
                <td className="px-3 py-2 text-center font-mono font-semibold text-text-primary bg-surface-hover">{avg}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
