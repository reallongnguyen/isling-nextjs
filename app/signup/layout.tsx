import { Metadata } from 'next'
import { PropsWithChildren } from 'react'

const websiteURL = process.env.NEXT_PUBLIC_WEBSITE_URL

export const metadata: Metadata = {
  title: 'Sign Up — Isling',
  description: 'Create a free account on Isling.Play',
  icons: '/favicon.ico',
  openGraph: {
    siteName: 'Isling',
    url: `${websiteURL}/signup`,
    type: 'music.playlist',
    title: 'Sign Up — Isling',
    description: 'Create a free account. Isling IoT',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80',
      },
    ],
  },
  robots: 'index, follow',
}

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <>
      <div className="fixed z-20 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {children}
      </div>
    </>
  )
}
