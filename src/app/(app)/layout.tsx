'use client'

import { FinanceProvider } from '@/contexts/FinanceContext'
import Layout from '@/components/layout/Layout'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <FinanceProvider>
      <Layout>{children}</Layout>
    </FinanceProvider>
  )
}
