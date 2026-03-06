'use client'

import { motion } from 'motion/react'

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

const DOUBLED = [...FRAMES, ...FRAMES]

const STRIPS = [
  { top:  '5%', dir: -1, dur: 42, op: 0.22 },
  { top: '21%', dir:  1, dur: 38, op: 0.18 },
  { top: '37%', dir: -1, dur: 46, op: 0.24 },
  { top: '54%', dir:  1, dur: 40, op: 0.19 },
  { top: '70%', dir: -1, dur: 44, op: 0.21 },
  { top: '86%', dir:  1, dur: 36, op: 0.17 },
]

const FRAME_W    = 148   // image frame width
const FRAME_H    = 88    // image frame height
const SPROCKET_H = 14    // sprocket band height (top + bottom)
const TOTAL_H    = SPROCKET_H + FRAME_H + SPROCKET_H  // 116px
const GAP        = 0     // no gap — strip reads as one continuous piece

const SET_W = FRAMES.length * (FRAME_W + GAP)

const IMG: React.CSSProperties = {
  width:          '100%',
  height:         '100%',
  objectFit:      'cover',
  objectPosition: 'center',
  filter:         'saturate(0.18) brightness(0.50) contrast(1.08)',
  display:        'block',
}

/* Sprocket band — the dark edge of the physical film strip */
const BAND: React.CSSProperties = {
  height:          SPROCKET_H,
  background:      'rgba(18,16,13,0.97)',
  display:         'flex',
  alignItems:      'center',
  justifyContent:  'space-around',
  padding:         '0 20px',
}

/* Individual perforation hole */
const HOLE: React.CSSProperties = {
  width:        10,
  height:       7,
  background:   '#0B0B0B',
  border:       '1px solid rgba(154,154,154,0.18)',
  borderRadius: 2,
  flexShrink:   0,
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
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,1) 7%, rgba(0,0,0,1) 93%, transparent 100%)',
        maskImage:       'linear-gradient(to right, transparent 0%, rgba(0,0,0,1) 7%, rgba(0,0,0,1) 93%, transparent 100%)',
      }}
    >
      {STRIPS.map((strip, si) => {
        const xFrom = strip.dir === -1 ? 0      : -SET_W
        const xTo   = strip.dir === -1 ? -SET_W : 0

        return (
          <div
            key={si}
            style={{
              position: 'absolute',
              top:      strip.top,
              left:     0,
              right:    0,
              opacity:  strip.op,
              overflow: 'hidden',
              height:   TOTAL_H,
            }}
          >
            <motion.div
              style={{
                display:    'flex',
                width:      'max-content',
                height:     '100%',
                willChange: 'transform',
              }}
              animate={{ x: [xFrom, xTo] }}
              transition={{
                duration: strip.dur,
                ease:     'linear',
                repeat:   Infinity,
              }}
            >
              {DOUBLED.map((src, fi) => (
                <div
                  key={fi}
                  style={{
                    width:       FRAME_W,
                    flexShrink:  0,
                    display:     'flex',
                    flexDirection: 'column',
                    /* Thin vertical splice line between frames */
                    borderRight: '1px solid rgba(0,0,0,0.6)',
                  }}
                >
                  {/* Top sprocket band with 3 holes */}
                  <div style={BAND}>
                    <div style={HOLE} />
                    <div style={HOLE} />
                    <div style={HOLE} />
                  </div>

                  {/* Image frame */}
                  <div style={{ height: FRAME_H, overflow: 'hidden' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" style={IMG} draggable={false} />
                  </div>

                  {/* Bottom sprocket band with 3 holes */}
                  <div style={BAND}>
                    <div style={HOLE} />
                    <div style={HOLE} />
                    <div style={HOLE} />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}
