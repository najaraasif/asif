import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://aasifnajar.vercel.app'),
  title: 'Mohammad Aasif Najar - Portfolio',
  description: '3D portfolio of Mohammad Aasif Najar - Web, App & Backend Developer with 10+ years of experience',
  keywords: ['Mohammad Aasif Najar', 'Web Developer', 'App Developer', 'Backend Developer', 'Portfolio', '3D Portfolio'],
  authors: [{ name: 'Mohammad Aasif Najar' }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Aasif Portfolio'
  },
  openGraph: {
    title: 'Mohammad Aasif Najar - Portfolio',
    description: '3D portfolio showcasing 10+ years of development expertise',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohammad Aasif Najar - Portfolio',
    description: '3D portfolio showcasing 10+ years of development expertise',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#D4AF37',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className={`${inter.className} bg-gradient-to-br from-luxury-dark via-luxury-blue to-luxury-dark min-h-screen antialiased`}>
        <div className="particle-bg" id="particle-container"></div>
        {children}
      </body>
    </html>
  )
}