// components/CustomCursorProvider.tsx
'use client'

import { useCustomCursor } from '../hooks/useCustomCursor'

interface CustomCursorProviderProps {
  children: React.ReactNode
}

export default function CustomCursorProvider({ children }: CustomCursorProviderProps) {
  useCustomCursor()
  return <>{children}</>
}