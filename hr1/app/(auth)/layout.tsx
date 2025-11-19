import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Authentication - HR SaaS',
  description: 'Sign in to your HR management account',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
