// app/layout.tsx
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Script from 'next/script'

export const metadata = {
  title: 'Walkman',
  description: 'Your gateway to high-quality music and podcasts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
          rel="stylesheet"
        />
      </head>
      <body
        className="bg-black text-white min-h-screen flex flex-col w-full"
        style={{ fontFamily: 'SF Pro Display, sans-serif' }}
      >
        <Nav />
        <main className="flex-grow w-full">
          {children}
        </main>
        <Footer />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/js/all.min.js" />
      </body>
    </html>
  )
}
