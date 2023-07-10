import { PropsWithChildren } from 'react'
import { Metadata } from 'next'
import '@/styles/globals.css'

import Providers from './providers'

const websiteURL = process.env.NEXT_PUBLIC_WEBSITE_URL

export const metadata: Metadata = {
  title: 'Isling',
  description: 'Isling IoT',
  icons: '/favicon.ico',
  openGraph: {
    siteName: 'Isling',
    url: websiteURL,
    type: 'website',
    title: 'Isling',
    description: 'Isling IoT',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80',
      },
    ],
  },
  robots: 'index, follow',
}

export default function RootLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <html lang="en">
      <body className="dark">
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
