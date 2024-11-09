"use client"

import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

export function Toast() {
  const { toasts } = useToast()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast, index) => (
        <div
          key={index}
          className={cn(
            "rounded-lg px-4 py-3 shadow-lg",
            toast.variant === "destructive" 
              ? "bg-destructive text-destructive-foreground"
              : "bg-background text-foreground"
          )}
        >
          {toast.title && (
            <div className="font-semibold">{toast.title}</div>
          )}
          {toast.description && (
            <div className="text-sm">{toast.description}</div>
          )}
        </div>
      ))}
    </div>
  )
}