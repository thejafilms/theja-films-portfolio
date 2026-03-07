'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { useState, useEffect, useRef, useCallback } from 'react'

/* ──────────────────────────────────────────────────────────────────────────
   Hero — Contact Sheet

   All 18 film stills fill the entire viewport in a 6 × 3 grid (3 × 6 on
   mobile), like a darkroom contact sheet.  On load they materialise in a
   random stagger out of darkness.  Hovering any still makes it colour-
   reveal while every other frame dims — giving the visitor the sensation
   of selecting a frame to print.  Click scrolls to that film section.

   No competing background element.  The work IS the hero.
   ────────────────────────────────────────────────────────────────────────── */

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

/* Deterministic "random-looking" delays — avoids SSR hydration mismatch   */
const DELAYS = [0.12, 0.48, 0.23, 0.67, 0.31, 0.55, 0.08, 0.42, 0.19, 0.74, 0.36, 0.61, 0.27, 0.51, 0.15, 0.69, 0.40, 0.05]

function scrollToFilm(filmId: string) {
  document.getElementById(filmId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const LOGO_STYLE = {
  fontSize:      '15px',
  fontWeight:    700,
  letterSpacing: '0.08em',
  lineHeight:    1.0,
  margin:        0,
  textTransform: 'uppercase' as const,
}

const EASE = [0.16, 1, 0.3, 1] as const

export function HeroBannerContact() {
  const [hovered, setHovered] = useState<number | null>(null)
  const intervalRef    = useRef<ReturnType<typeof setInterval> | null>(null)
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const initTimerRef   = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isUserActive   = useRef(false)

  /* Auto-cycle a random highlighted frame every 1.8 s (idle animation).
     On desktop: pauses as soon as the mouse moves, resumes 3 s after it stops.
     On touch: no mousemove events, so it runs continuously.                 */
  useEffect(() => {
    initTimerRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        if (isUserActive.current) return
        setHovered(prev => {
          let next: number
          do { next = Math.floor(Math.random() * CELLS.length) }
          while (next === prev)
          return next
        })
      }, 1800)
    }, 2500) // wait for entry animation to finish

    return () => {
      if (initTimerRef.current)   clearTimeout(initTimerRef.current)
      if (intervalRef.current)    clearInterval(intervalRef.current)
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    }
  }, [])

  /* Mark user as active on any mouse movement; resume auto-cycle 3 s later */
  const handleMouseMove = useCallback(() => {
    isUserActive.current = true
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    resumeTimerRef.current = setTimeout(() => {
      isUserActive.current = false
    }, 3000)
  }, [])

  return (
    <section className="snap-section relative overflow-hidden bg-[#0B0B0B]" onMouseMove={handleMouseMove}>

      {/* ── Contact-sheet grid ──────────────────────────────────────────── */}
      {/* 3 cols on mobile → 6 cols on sm+; rows fill the remaining height  */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-6 sm:grid-cols-6 sm:grid-rows-3 gap-px">
        {CELLS.map((cell, i) => (
          <motion.div
            key={i}
            className="relative overflow-hidden cursor-pointer"
            variants={{
              hidden:   { opacity: 0, scale: 1.08 },
              visible:  {
                opacity: 1, scale: 1,
                transition: { delay: DELAYS[i], duration: 0.95, ease: EASE },
              },
              hovered:  {
                scale: 1.05,
                transition: { duration: 0.4, ease: EASE },
              },
            }}
            initial="hidden"
            animate="visible"
            /* whileHover only fires on pointer devices — safe to keep for desktop */
            whileHover="hovered"
            /* CSS transition handles the filter so the dim-others effect   *
             * (driven by React state) stays outside Framer Motion's cycle. */
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

            {/* Film title — slides up on hover */}
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

      {/* ── Vignette — heavy edges + centre darkening for text ──────────── */}
      <div
        className="absolute inset-0 pointer-events-none z-[5]"
        style={{
          background: [
            'radial-gradient(ellipse 44% 34% at 50% 50%, rgba(11,11,11,0.92) 0%, transparent 100%)',
            'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 35%, rgba(11,11,11,0.60) 70%, rgba(11,11,11,0.95) 100%)',
          ].join(', '),
        }}
      />

      {/* ── Logo ─────────────────────────────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 flex justify-center z-10 pt-8">
        <motion.button
          className="font-dm cursor-pointer bg-transparent border-0 p-0"
          style={{ ...LOGO_STYLE, color: 'rgba(242,242,242,0.88)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1.4 }}
          onClick={() => { window.location.href = '/' }}
        >
          Theja Mitta
        </motion.button>
      </div>

      {/* ── Caption ──────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center pointer-events-none">
        <motion.p
          className="font-heading text-[#D8D8D8]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1.0, ease: EASE }}
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

      {/* ── Scroll cue ───────────────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2.6, duration: 1 }}
      >
        <div style={{
          width: '1px', height: '52px',
          background: 'linear-gradient(to bottom, #9A9A9A, transparent)',
          animation: 'scrollPulse 2.2s ease-in-out infinite',
        }} />
        <span className="font-body text-[#9A9A9A]"
          style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
          Scroll
        </span>
      </motion.div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.35; transform: scaleY(1); }
          50%       { opacity: 1;   transform: scaleY(1.15); }
        }
      `}</style>
    </section>
  )
}
