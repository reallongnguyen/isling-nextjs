import { Metadata } from 'next'
import { PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: 'Sign Out — Isling',
  description: 'Isling IoT',
  icons: '/favicon.ico',
}

export default function SignOutLayout({
  children,
}: PropsWithChildren<unknown>) {
  return children
}
