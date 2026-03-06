'use client'

import dynamic from 'next/dynamic'
import { useState, useCallback } from 'react'

/* Load FilmIntro client-only — prevents SSR/hydration mismatch because the
   intro animation has no server-renderable content worth preserving.        */
const FilmIntro = dynamic(
  () => import('@/components/ui/film-intro').then(m => ({ default: m.FilmIntro })),
  { ssr: false },
)

/* Thin client boundary that:
   1. Renders the FilmIntro overlay (client-only, no SSR)
   2. Mounts the main site content only after intro completes
      (so the HeroBanner animation starts fresh and isn't missed)       */
export function IntroGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)
  const onComplete = useCallback(() => setReady(true), [])

  return (
    <>
      {!ready && <FilmIntro onComplete={onComplete} />}
      {ready && children}
    </>
  )
}
