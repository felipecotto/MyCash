'use client'

import { MotionConfig } from 'framer-motion'

/** Faz o framer-motion respeitar a preferência "reduzir movimento" do sistema */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
