import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mohammad Aasif Najar - Luxury Portfolio',
  description: 'Ultra-luxurious 3D portfolio of Mohammad Aasif Najar - Web, App & Backend Developer with 10+ years of experience',
  keywords: ['Mohammad Aasif Najar', 'Web Developer', 'App Developer', 'Backend Developer', 'Portfolio', '3D Portfolio'],
  authors: [{ name: 'Mohammad Aasif Najar' }],
  viewport: 'width=device-width, initial-scale=1',
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
      </head>
      <body className={`${inter.className} bg-gradient-to-br from-luxury-dark via-luxury-blue to-luxury-dark min-h-screen`}>
        <div className="particle-bg" id="particle-container"></div>
        {children}
      </body>
    </html>
  )
}