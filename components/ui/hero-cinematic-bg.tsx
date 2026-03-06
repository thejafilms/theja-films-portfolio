'use client'

import { motion } from 'motion/react'

/* ──────────────────────────────────────────────────────────────────────────
   Serpentine film strip — "a continuous reel flowing through time"

   Six thin strips of film stills run across the hero.  Odd rows flow
   left-to-right, even rows right-to-left — like a single strip of 35mm
   film looping through the gate of a projector, folding back on itself.

   Each strip:
     • Frames are actual stills from all three films, interleaved
     • Near-monochrome + dark filter → looks like a film negative
     • Thin 1px border → classic film-frame edge
     • Strip-edge lines → the opaque edge of a physical film strip
     • Seamless infinite scroll via doubled content array

   The whole canvas fades to black at the left/right section edges
   (CSS mask) so strips feel like they're emerging from and returning
   to darkness — i.e. emerging from the projector beam.
   ────────────────────────────────────────────────────────────────────────── */

/* The frames — interleaved across all three films for variety.
   Doubled inside the marquee for seamless infinite scroll.              */
const FRAMES = [
  '/film_grabs/tim-1.png',
  '/film_grabs/thy-1.jpg',
  '/film_grabs/sov-1.png',
  '/film_grabs/tim-3.png',
  '/film_grabs/thy-3.jpg',
  '/film_grabs/sov-3.png',
  '/film_grabs/tim-5.png',
  '/film_grabs/thy-5.jpg',
  '/film_grabs/sov-5.png',
  '/film_grabs/tim-2.png',
  '/film_grabs/thy-2.jpg',
  '/film_grabs/sov-4.png',
]

const DOUBLED = [...FRAMES, ...FRAMES]   // duplicate for seamless loop

/* Each strip: vertical position, direction, speed, opacity.
   Alternating dir creates the snake / serpentine effect.                */
const STRIPS = [
  { top:  '5%', dir: -1, dur: 42, op: 0.22 },   // ← left
  { top: '21%', dir:  1, dur: 38, op: 0.18 },   // → right
  { top: '37%', dir: -1, dur: 46, op: 0.24 },   // ← left
  { top: '54%', dir:  1, dur: 40, op: 0.19 },   // → right
  { top: '70%', dir: -1, dur: 44, op: 0.21 },   // ← left
  { top: '86%', dir:  1, dur: 36, op: 0.17 },   // → right
]

const FRAME_W  = 148   // px — thin, cinematic landscape frame
const FRAME_H  = 93    // px
const GAP      = 3     // px gap between frames (like a splice mark)

/* Width of one complete set of frames — used to compute seamless loop  */
const SET_W = FRAMES.length * (FRAME_W + GAP)

/* Common image style — near-monochrome, underexposed                   */
const IMG: React.CSSProperties = {
  width:      '100%',
  height:     '100%',
  objectFit:  'cover',
  objectPosition: 'center',
  filter: 'saturate(0.18) brightness(0.50) contrast(1.08)',
  display: 'block',
}

export function HeroCinematicBg() {
  return (
    <div
      aria-hidden
      style={{
        position:        'absolute',
        inset:           0,
        overflow:        'hidden',
        pointerEvents:   'none',
        /* Fade the entire strip canvas at both section edges so strips
           appear to emerge from and return to darkness.                */
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,1) 7%, rgba(0,0,0,1) 93%, transparent 100%)',
        maskImage:       'linear-gradient(to right, transparent 0%, rgba(0,0,0,1) 7%, rgba(0,0,0,1) 93%, transparent 100%)',
      }}
    >
      {STRIPS.map((strip, si) => {
        /* Seamless marquee: left-flowing strips animate from 0 → -SET_W,
           right-flowing strips animate from -SET_W → 0.  Both jump back
           to the start value invisibly since the content repeats.      */
        const xFrom = strip.dir === -1 ? 0       : -SET_W
        const xTo   = strip.dir === -1 ? -SET_W  : 0

        return (
          <div
            key={si}
            style={{
              position: 'absolute',
              top:      strip.top,
              left:     0,
              right:    0,
              opacity:  strip.op,
            }}
          >
            {/* Top film-edge line */}
            <div style={{ height: 1, background: 'rgba(154,154,154,0.07)' }} />

            {/* Scrolling strip */}
            <div style={{ overflow: 'hidden', height: FRAME_H }}>
              <motion.div
                style={{
                  display:     'flex',
                  gap:         GAP,
                  width:       'max-content',
                  height:      '100%',
                  willChange:  'transform',
                }}
                animate={{ x: [xFrom, xTo] }}
                transition={{
                  duration:    strip.dur,
                  ease:        'linear',
                  repeat:      Infinity,
                }}
              >
                {DOUBLED.map((src, fi) => (
                  <div
                    key={fi}
                    style={{
                      width:     FRAME_W,
                      height:    FRAME_H,
                      flexShrink: 0,
                      border:    '1px solid rgba(242,242,242,0.08)',
                      overflow:  'hidden',
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" style={IMG} draggable={false} />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Bottom film-edge line */}
            <div style={{ height: 1, background: 'rgba(154,154,154,0.07)' }} />
          </div>
        )
      })}
    </div>
  )
}
