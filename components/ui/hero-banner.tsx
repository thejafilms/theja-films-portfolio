'use client'

// ─────────────────────────────────────────────────────────────────────────────
//  HERO VARIANT SWITCH — change one word to swap designs.
//  'contact-sheet' → full-viewport grid, hover to colour-reveal
//  'classic'       → six large stills, two-wing layout, gentle rise
//  '3d-scatter'    → tiles fly in from 3D space, assemble into grid on load
// ─────────────────────────────────────────────────────────────────────────────
const VARIANT: 'contact-sheet' | 'classic' | '3d-scatter' = '3d-scatter'

import { HeroBannerContact } from './hero-banner-contact'
import { HeroBannerClassic } from './hero-banner-classic'
import { HeroBanner3D }      from './hero-banner-3d'

export function HeroBanner() {
  if (VARIANT === '3d-scatter')   return <HeroBanner3D />
  if (VARIANT === 'contact-sheet') return <HeroBannerContact />
  return <HeroBannerClassic />
}
