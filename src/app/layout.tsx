// app/layout.tsx

'use client';

import { usePathname } from 'next/navigation';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Script from 'next/script';
import { Analytics } from "@vercel/analytics/next";
import Providers from '@/components/providers/SessionProvider';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideLayout = pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password' || pathname === '/reset-password';

  return (
    <html lang="en">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
        />
      </head>
      <body
        className="bg-black text-white min-h-screen flex flex-col w-full"
        style={{ fontFamily: 'SF Pro Display, sans-serif' }}
      >
        <Providers>
          {!hideLayout && <Nav />}
          <main className="flex-grow w-full">
            {children}
            <Analytics />
          </main>
          {!hideLayout && <Footer />}
        </Providers>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/js/all.min.js" />
      </body>
    </html>
  );
}
