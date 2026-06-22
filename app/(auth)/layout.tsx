import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-surface border border-dn-border rounded-2xl shadow-xl overflow-hidden animate-fade-in">
        <div className="p-8 pb-6 text-center border-b border-dn-border/50">
          <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
            <Image 
              src="/logo-horizontal-light-v2.png" 
              alt="Ecommetrics Logo" 
              width={240} 
              height={60} 
              className="dark:hidden mx-auto h-12 w-auto"
              priority
            />
            <Image 
              src="/logo-horizontal-dark-v2.png" 
              alt="Ecommetrics Logo" 
              width={240} 
              height={60} 
              className="hidden dark:block mx-auto h-12 w-auto"
              priority
            />
          </Link>
          <p className="text-sm text-text-muted mt-4">Jual Lebih Cerdas, Bukan Lebih Keras.</p>
        </div>
        <div className="p-8 pt-6">
          {children}
        </div>
      </div>
    </div>
  );
}
