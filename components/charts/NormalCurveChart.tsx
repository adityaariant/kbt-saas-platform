'use client';

interface NormalCurveChartProps { meanA: number; meanB: number; label?: string; }

function normalPdf(x: number, mean: number, std: number): number {
  const exp = -0.5 * Math.pow((x - mean) / std, 2);
  return (1 / (std * Math.sqrt(2 * Math.PI))) * Math.pow(Math.E, exp);
}

function buildPath(mean: number, std: number, steps: number = 80): string {
  const xMin = mean - 4 * std;
  const xMax = mean + 4 * std;
  const dx = (xMax - xMin) / steps;
  const points: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * dx;
    const y = normalPdf(x, mean, std);
    const px = ((x - (mean - 4 * std)) / (8 * std)) * 400 + 50;
    const py = 180 - y * std * 500;
    points.push(`${i === 0 ? 'M' : 'L'}${px.toFixed(1)},${py.toFixed(1)}`);
  }
  return points.join(' ');
}

export function NormalCurveChart({ meanA, meanB, label }: NormalCurveChartProps) {
  const stdA = Math.abs(meanA) * 0.15 + 0.5;
  const stdB = Math.abs(meanB) * 0.15 + 0.5;
  const pathA = buildPath(meanA, stdA);
  const pathB = buildPath(meanB, stdB);

  return (
    <div>
      {label && <p className="text-sm font-semibold text-text-secondary mb-2">{label}</p>}
      <svg viewBox="0 0 500 220" className="w-full h-auto">
        <path d={pathA} fill="rgba(15,76,129,0.15)" stroke="#0F4C81" strokeWidth="2" />
        <path d={pathB} fill="rgba(0,196,154,0.15)" stroke="#00C49A" strokeWidth="2" />
        <line x1="50" y1="185" x2="450" y2="185" stroke="var(--border)" strokeWidth="1" />
        <text x="130" y="210" className="text-xs" fill="var(--text-secondary)" fontSize="12">Grup A ({meanA.toFixed(1)}%)</text>
        <text x="300" y="210" className="text-xs" fill="var(--text-secondary)" fontSize="12">Grup B ({meanB.toFixed(1)}%)</text>
      </svg>
    </div>
  );
}
