'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { cn } from '@/lib/utils'

/* ── Mouse context ─────────────────────────────────────── */

interface MouseOffset {
  x: number // -1 to 1
  y: number // -1 to 1
}

const ParallaxContext = createContext<MouseOffset>({ x: 0, y: 0 })

/* ── ParallaxFloating ──────────────────────────────────── */
// Wrap the hero section — tracks mouse and provides offset to children.

interface ParallaxFloatingProps {
  children: ReactNode
  className?: string
}

export function ParallaxFloating({ children, className }: ParallaxFloatingProps) {
  const [mouse, setMouse] = useState<MouseOffset>({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <ParallaxContext.Provider value={mouse}>
      <div className={cn('relative w-full h-full', className)}>
        {children}
      </div>
    </ParallaxContext.Provider>
  )
}

/* ── FloatingElement ───────────────────────────────────── */
// Place inside <ParallaxFloating>. Position via className.
// depth: 0.1 (barely moves) → 1.0 (moves a lot)

interface FloatingElementProps {
  depth?: number
  className?: string
  children: ReactNode
}

export function FloatingElement({
  depth = 0.4,
  className,
  children,
}: FloatingElementProps) {
  const mouse = useContext(ParallaxContext)

  const tx = mouse.x * depth * 28
  const ty = mouse.y * depth * 20

  return (
    <div
      className={cn('absolute', className)}
      style={{
        transform: `translate(${tx}px, ${ty}px)`,
        transition: 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  )
}
