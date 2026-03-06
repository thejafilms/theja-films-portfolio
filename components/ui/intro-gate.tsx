'use client'

import { useState, useCallback } from 'react'
import { FilmIntro } from '@/components/ui/film-intro'

/* Thin client boundary that:
   1. Renders the FilmIntro overlay
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
