'use client'

// ─────────────────────────────────────────────────────────────────────────────
//  HERO VARIANT SWITCH — change one word to swap designs, then push.
//  'contact-sheet' → full-viewport grid, hover to colour-reveal
//  'classic'       → six large stills, two-wing layout, gentle rise
// ─────────────────────────────────────────────────────────────────────────────
const VARIANT: 'contact-sheet' | 'classic' = 'contact-sheet'

import { HeroBannerContact } from './hero-banner-contact'
import { HeroBannerClassic } from './hero-banner-classic'

export function HeroBanner() {
  return VARIANT === 'contact-sheet' ? <HeroBannerContact /> : <HeroBannerClassic />
}
