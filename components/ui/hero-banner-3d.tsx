'use client'

/* ──────────────────────────────────────────────────────────────────────────
   Hero — 3D Scatter & Reform

   On load every tile starts scattered in 3D space: rotated on all three
   axes, displaced in X/Y, pushed back in Z (depth).  Each tile then
   springs back to its exact grid cell with a staggered, spring-style ease
   — like contact prints thrown in the air and then pulled back into place
   by an invisible magnet.

   After assembly the same colour-reveal + auto-cycle idle behaviour from
   the contact-sheet variant kicks in.
   ────────────────────────────────────────────────────────────────────────── */

import Image    from 'next/image'
import { motion } from 'motion/react'
import { useState, useEffect, useRef, useCallback } from 'react'

interface Cell {
  src: string; w: number; h: number
  filmId: string; filmTitle: string
}

const CELLS: Cell[] = [
  { src: '/film_grabs/tim-1.png', w: 3600, h: 2338, filmId: 'film-1', filmTitle: 'This Is My Moment..' },
  { src: '/film_grabs/thy-1.jpg', w: 3840, h: 2160, filmId: 'film-2', filmTitle: 'Theyyam – A God Awakens' },
  { src: '/film_grabs/sov-1.png', w: 3600, h: 2338, filmId: 'film-3', filmTitle: 'The Soul of Varanasi' },
  { src: '/film_grabs/tim-2.png', w: 3600, h: 2338, filmId: 'film-1', filmTitle: 'This Is My Moment..' },
  { src: '/film_grabs/thy-2.jpg', w: 3840, h: 2160, filmId: 'film-2', filmTitle: 'Theyyam – A God Awakens' },
  { src: '/film_grabs/sov-2.png', w: 3600, h: 2338, filmId: 'film-3', filmTitle: 'The Soul of Varanasi' },
  { src: '/film_grabs/tim-3.png', w: 3600, h: 2338, filmId: 'film-1', filmTitle: 'This Is My Moment..' },
  { src: '/film_grabs/thy-3.jpg', w: 3840, h: 2160, filmId: 'film-2', filmTitle: 'Theyyam – A God Awakens' },
  { src: '/film_grabs/sov-3.png', w: 3600, h: 2338, filmId: 'film-3', filmTitle: 'The Soul of Varanasi' },
  { src: '/film_grabs/tim-4.png', w: 3600, h: 2338, filmId: 'film-1', filmTitle: 'This Is My Moment..' },
  { src: '/film_grabs/thy-4.jpg', w: 3840, h: 2160, filmId: 'film-2', filmTitle: 'Theyyam – A God Awakens' },
  { src: '/film_grabs/sov-4.png', w: 3600, h: 2338, filmId: 'film-3', filmTitle: 'The Soul of Varanasi' },
  { src: '/film_grabs/tim-5.png', w: 3600, h: 2338, filmId: 'film-1', filmTitle: 'This Is My Moment..' },
  { src: '/film_grabs/thy-5.jpg', w: 3840, h: 2160, filmId: 'film-2', filmTitle: 'Theyyam – A God Awakens' },
  { src: '/film_grabs/sov-5.png', w: 2145, h: 1688, filmId: 'film-3', filmTitle: 'The Soul of Varanasi' },
  { src: '/film_grabs/tim-6.png', w: 3600, h: 2338, filmId: 'film-1', filmTitle: 'This Is My Moment..' },
  { src: '/film_grabs/thy-6.jpg', w: 3840, h: 2160, filmId: 'film-2', filmTitle: 'Theyyam – A God Awakens' },
  { src: '/film_grabs/sov-6.png', w: 3024, h: 1964, filmId: 'film-3', filmTitle: 'The Soul of Varanasi' },
]

/* Deterministic scatter positions — no Math.random() to avoid SSR mismatch.
   Each tile gets a unique rotX / rotY / rotZ + x / y / z offset.          */
const SCATTER = [
  { rotateX: -32, rotateY:  48, rotateZ:  -9, x:  180, y: -140, z: -420 },
  { rotateX:  18, rotateY: -52, rotateZ:  14, x: -230, y:   60, z: -310 },
  { rotateX: -22, rotateY:  35, rotateZ: -18, x:  -80, y:  200, z: -380 },
  { rotateX:  28, rotateY: -38, rotateZ:   7, x:  220, y:  110, z: -290 },
  { rotateX: -15, rotateY:  58, rotateZ: -12, x: -180, y: -160, z: -450 },
  { rotateX:  35, rotateY: -25, rotateZ:  20, x:   90, y:  190, z: -340 },
  { rotateX: -28, rotateY:  44, rotateZ:  -6, x: -240, y:   70, z: -390 },
  { rotateX:  22, rotateY: -60, rotateZ:  11, x:  150, y: -180, z: -260 },
  { rotateX: -18, rotateY:  32, rotateZ: -16, x:  -60, y:  220, z: -480 },
  { rotateX:  30, rotateY: -42, rotateZ:   9, x:  200, y: -100, z: -320 },
  { rotateX: -25, rotateY:  50, rotateZ: -13, x: -190, y:  130, z: -360 },
  { rotateX:  20, rotateY: -35, rotateZ:  18, x:   70, y: -210, z: -430 },
  { rotateX: -35, rotateY:  38, rotateZ:  -7, x:  260, y:   80, z: -280 },
  { rotateX:  15, rotateY: -55, rotateZ:  15, x: -110, y:  170, z: -410 },
  { rotateX: -20, rotateY:  45, rotateZ: -10, x:  -70, y: -190, z: -350 },
  { rotateX:  25, rotateY: -40, rotateZ:   8, x:  170, y:  150, z: -470 },
  { rotateX: -30, rotateY:  55, rotateZ: -14, x: -200, y:  -90, z: -300 },
  { rotateX:  18, rotateY: -48, rotateZ:  12, x:   40, y:  240, z: -440 },
]

/* Staggered arrival delays (seconds) — tiles arrive in overlapping waves  */
const STAGGER = [0.05, 0.16, 0.28, 0.09, 0.21, 0.33, 0.07, 0.19, 0.30, 0.12, 0.24, 0.03, 0.14, 0.26, 0.08, 0.18, 0.29, 0.11]

const EASE = [0.16, 1, 0.3, 1] as const   /* expo out — snappy spring feel */

const LOGO_STYLE = {
  fontSize:      '20px',
  fontWeight:    700,
  letterSpacing: '0.08em',
  lineHeight:    1.0,
  margin:        0,
  textTransform: 'uppercase' as const,
}

function scrollToFilm(filmId: string) {
  document.getElementById(filmId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function HeroBanner3D() {
  const [hovered, setHovered] = useState<number | null>(null)
  const intervalRef    = useRef<ReturnType<typeof setInterval> | null>(null)
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const initTimerRef   = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isUserActive   = useRef(false)

  /* Auto-cycle idle highlight — starts after 3D assembly finishes          */
  useEffect(() => {
    initTimerRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        if (isUserActive.current) return
        setHovered(prev => {
          let next: number
          do { next = Math.floor(Math.random() * CELLS.length) } while (next === prev)
          return next
        })
      }, 1800)
    }, 3200)

    return () => {
      if (initTimerRef.current)   clearTimeout(initTimerRef.current)
      if (intervalRef.current)    clearInterval(intervalRef.current)
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    }
  }, [])

  const handleMouseMove = useCallback(() => {
    isUserActive.current = true
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    resumeTimerRef.current = setTimeout(() => { isUserActive.current = false }, 3000)
  }, [])

  return (
    <section
      className="snap-section relative overflow-hidden bg-[#0B0B0B]"
      onMouseMove={handleMouseMove}
    >

      {/* ── 3D perspective container ──────────────────────────────────────── */}
      {/* perspective set here (no overflow so the 3D context isn't flattened) */}
      <div
        className="absolute inset-0 grid grid-cols-3 grid-rows-6 sm:grid-cols-6 sm:grid-rows-3 gap-px"
        style={{ perspective: '1400px' }}
      >
        {CELLS.map((cell, i) => (
          <motion.div
            key={i}
            className="relative overflow-hidden cursor-pointer"
            /* ── scatter → grid ───────────────────────────────────────────── */
            initial={{ ...SCATTER[i], opacity: 0 }}
            animate={{ rotateX: 0, rotateY: 0, rotateZ: 0, x: 0, y: 0, z: 0, opacity: 1 }}
            transition={{ delay: STAGGER[i], duration: 1.7, ease: EASE }}
            /* ── colour-reveal via CSS filter (same as contact-sheet) ─────── */
            style={{
              filter: hovered === null
                ? 'saturate(0.14) brightness(0.50) contrast(1.05)'
                : hovered === i
                  ? 'saturate(0.88) brightness(0.90)'
                  : 'saturate(0.06) brightness(0.22)',
              transition: 'filter 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onHoverStart={() => { isUserActive.current = true; setHovered(i) }}
            onHoverEnd={() => setHovered(null)}
            onClick={() => scrollToFilm(cell.filmId)}
          >
            <Image
              src={cell.src}
              width={cell.w}
              height={cell.h}
              alt=""
              className="w-full h-full object-cover"
              priority={i < 9}
            />

            {/* Film title overlay — slides up on hover */}
            <motion.div
              className="absolute bottom-0 inset-x-0"
              style={{
                padding:    '36px 10px 9px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
              }}
              animate={{ opacity: hovered === i ? 1 : 0, y: hovered === i ? 0 : 6 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <p
                className="font-body text-center text-[#F2F2F2]"
                style={{ fontSize: '7px', letterSpacing: '0.26em', textTransform: 'uppercase' }}
              >
                {cell.filmTitle}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* ── Vignette ──────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none z-[5]"
        style={{
          background: [
            'radial-gradient(ellipse 44% 34% at 50% 50%, rgba(11,11,11,0.92) 0%, transparent 100%)',
            'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 35%, rgba(11,11,11,0.60) 70%, rgba(11,11,11,0.95) 100%)',
          ].join(', '),
        }}
      />

      {/* ── Logo ──────────────────────────────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 flex justify-center z-10 pt-8">
        <motion.button
          className="font-dm cursor-pointer bg-transparent border-0 p-0"
          style={{ ...LOGO_STYLE, color: 'rgba(242,242,242,0.88)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1.4 }}
          onClick={() => { window.location.href = '/' }}
        >
          Theja Mitta
        </motion.button>
      </div>

      {/* ── Caption ───────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center pointer-events-none">
        <motion.p
          className="font-heading text-[#D8D8D8]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 1.0, ease: EASE }}
          style={{
            fontSize:   'clamp(13px, 3.5vw, 21px)',
            fontStyle:  'italic',
            fontWeight: 400,
            lineHeight: 1.7,
            width:      '100%',
            maxWidth:   '480px',
            textShadow: '0 0 32px rgba(0,0,0,1), 0 2px 12px rgba(0,0,0,0.95)',
          }}
        >
          <span style={{ display: 'block' }}>Raw emotion, real people, honest places —</span>
          <span style={{ display: 'block' }}>stories that stay long after the frame fades.</span>
        </motion.p>
      </div>

      {/* ── Scroll cue ────────────────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 3.4, duration: 1 }}
      >
        <div style={{
          width:      '1px',
          height:     '52px',
          background: 'linear-gradient(to bottom, #9A9A9A, transparent)',
          animation:  'scrollPulse 2.2s ease-in-out infinite',
        }} />
        <span
          className="font-body text-[#9A9A9A]"
          style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase' }}
        >
          Scroll
        </span>
      </motion.div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.35; transform: scaleY(1);    }
          50%       { opacity: 1;   transform: scaleY(1.15); }
        }
      `}</style>
    </section>
  )
}
