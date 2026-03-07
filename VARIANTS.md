# Portfolio Design Variants — Quick Reference

## Overview

The portfolio has **three independent toggles** you can flip with one word each:

| Toggle | File | What it controls |
|--------|------|-----------------|
| Hero design | `components/ui/hero-banner.tsx` line 8 | Which hero variant shows |
| Film intro | `components/ui/intro-gate.tsx` | Whether the intro plays |

---

## 1. Hero Banner Variant

**File:** `components/ui/hero-banner.tsx`

```tsx
const VARIANT: 'contact-sheet' | 'classic' = 'contact-sheet'
//                                             ^^^^^^^^^^^^^^
//                               Change this one word
```

| Value | Design | Edit file |
|-------|--------|-----------|
| `'contact-sheet'` | Full-viewport grid of 18 stills, hover to colour-reveal | `hero-banner-contact.tsx` |
| `'classic'` | Six large stills, two-wing layout, parallax float | `hero-banner-classic.tsx` |

**Steps to switch:**
1. Open `components/ui/hero-banner.tsx`
2. Change line 8 to `'contact-sheet'` or `'classic'`
3. Save → `git add . && git commit -m "switch hero to classic" && git push`

---

## 2. Film Intro (Marvel-style)

**File:** `components/ui/intro-gate.tsx`

The intro plays automatically. To **disable** it temporarily (e.g. during heavy editing), change the render in `intro-gate.tsx`:

```tsx
// INTRO ON (default):
{!ready && <FilmIntro onComplete={onComplete} />}
{ready && children}

// INTRO OFF (skip straight to site):
// Replace the above two lines with just:
{children}
```

Or add a constant at the top of `intro-gate.tsx`:

```tsx
const INTRO_ENABLED = true   // ← change to false to skip intro
```

Then wrap the FilmIntro line:
```tsx
{INTRO_ENABLED && !ready && <FilmIntro onComplete={onComplete} />}
{(!INTRO_ENABLED || ready) && children}
```

### Intro sequence (for reference)
```
0ms       Film stills flip rapidly (starts slow, accelerates)
2450ms    Hard cut → pure white flash
2780ms    Flash fades → "THEJA MITTA" materialises on black
3750ms    Overlay fades out
4450ms    Main site mounts → Hero banner animation begins
```

**Click anywhere during intro = skip immediately.**

---

## 3. Editing a Specific Design

### Contact sheet (`hero-banner-contact.tsx`)
- **Grid layout**: search `grid-cols-3` — change cell counts in `CELLS` array
- **Hover effect**: search `isHovered` — adjust `saturate`/`brightness` filter values
- **Caption text**: search `Raw emotion` — two `<span>` blocks, one per line
- **Stagger timing**: `DELAYS` array (18 values, one per cell)

### Classic wing layout (`hero-banner-classic.tsx`)
- **Stills**: `STILLS` array — 3 left wing + 3 right wing entries
- **Position**: `posClass` field (Tailwind `top-[%] left-[%]`)
- **Rotation**: `rotation` field (e.g. `'-1.2deg'`)
- **Size**: `size` field (e.g. `'w-[340px] h-[221px]'`)
- **Caption text**: search `Raw emotion`

### Film intro (`film-intro.tsx`)
- **Frames**: `FRAMES` array at top — add/remove/reorder stills
- **Speed**: acceleration constants at lines ~68–70 (`speed = 70 / 40 / 22`)
- **Timing**: `setTimeout` values — 2450ms (flash), 330ms (reveal), 970ms (exit)
- **Logo style**: search `THEJA MITTA` — font size `clamp(44px, 8vw, 116px)`

---

## Dev Workflow

```bash
# Start local dev server
npm run dev

# After any change — commit and push
git add .
git commit -m "describe your change"
git push
```

Vercel auto-deploys on every push to the connected branch.

---

## File Map

```
components/ui/
├── hero-banner.tsx          ← VARIANT toggle (one word)
├── hero-banner-contact.tsx  ← Contact sheet design
├── hero-banner-classic.tsx  ← Classic wing layout
├── film-intro.tsx           ← Marvel-style intro animation
├── intro-gate.tsx           ← Intro on/off + client boundary
├── hero-cinematic-bg.tsx    ← Horizontal film strips (unused — available)
├── scroll-animated-video.tsx
├── site-footer.tsx
└── parallax-floating.tsx

app/
├── page.tsx                 ← Main page (server component)
├── layout.tsx               ← Fonts + metadata
└── globals.css              ← Snap scroll, keyframes

public/film_grabs/           ← All film stills
  tim-1..6.png               ← This Is My Moment
  thy-1..6.jpg               ← Theyyam
  sov-1..6.png               ← Soul of Varanasi
  grab-01..08.png            ← Extra stills (used in intro)
  theyyam-1..5.jpg           ← Intro-specific
  varanasi-1..3.{png,jpg}    ← Intro-specific
  moment-1.png               ← Intro-specific
```
