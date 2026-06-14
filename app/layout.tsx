import type { Metadata } from 'next';
import './globals.css';
import { LayoutShell } from './layout-shell';

export const metadata: Metadata = {
  title: 'Ecometrics — Jual Lebih Cerdas, Bukan Lebih Keras',
  description: 'Platform Business Intelligence untuk UMKM dan seller marketplace Indonesia',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="font-body antialiased">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}