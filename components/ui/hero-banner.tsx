'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import Floating, { FloatingElement } from '@/components/ui/parallax-floating'
import { HeroCinematicBg } from '@/components/ui/hero-cinematic-bg'

interface Still {
  src: string; w: number; h: number; depth: number
  posClass: string; rotation: string; size: string
  filmId: string; filmTitle: string
  /* Offset from each image's final resting position to the screen centre
     (≈50vw, 50vh) — used for the centre-burst entrance animation.        */
  initialX: string; initialY: string
}

const STILLS: Still[] = [
  // ── Left column ─────────────────────────────────────────────────────────
  {
    src: '/film_grabs/tim-1.png',    w: 3600, h: 2338, depth: 2.2,
    posClass: 'top-[1%]   left-[0%]',  rotation: '-1.8deg', size: 'w-[260px] h-[169px]',
    filmId: 'film-1', filmTitle: 'This Is My Moment..',
    initialX: '41vw',  initialY: '40vh',
  },
  {
    src: '/film_grabs/thy-1.jpg',    w: 3840, h: 2160, depth: 6.5,
    posClass: 'top-[12%]  left-[1%]',  rotation: '-2.1deg', size: 'w-[185px] h-[104px]',
    filmId: 'film-2', filmTitle: 'Theyyam – A God Awakens',
    initialX: '43vw',  initialY: '32vh',
  },
  {
    src: '/film_grabs/sov-1.png',    w: 3600, h: 2338, depth: 1.8,
    posClass: 'top-[23%]  left-[-1%]', rotation: '-1.2deg', size: 'w-[230px] h-[149px]',
    filmId: 'film-3', filmTitle: 'The Soul of Varanasi',
    initialX: '43vw',  initialY: '19vh',
  },
  {
    src: '/film_grabs/tim-2.png',    w: 3600, h: 2338, depth: 4.2,
    posClass: 'top-[35%]  left-[0%]',  rotation: '-1.0deg', size: 'w-[200px] h-[130px]',
    filmId: 'film-1', filmTitle: 'This Is My Moment..',
    initialX: '43vw',  initialY: '8vh',
  },
  {
    src: '/film_grabs/thy-2.jpg',    w: 3840, h: 2160, depth: 3.8,
    posClass: 'top-[47%]  left-[1%]',  rotation: '-1.5deg', size: 'w-[245px] h-[138px]',
    filmId: 'film-2', filmTitle: 'Theyyam – A God Awakens',
    initialX: '41vw',  initialY: '-5vh',
  },
  {
    src: '/film_grabs/sov-2.png',    w: 3600, h: 2338, depth: 5.0,
    posClass: 'top-[58%]  left-[-1%]', rotation: '-0.8deg', size: 'w-[195px] h-[127px]',
    filmId: 'film-3', filmTitle: 'The Soul of Varanasi',
    initialX: '44vw',  initialY: '-15vh',
  },
  {
    src: '/film_grabs/tim-3.png',    w: 3600, h: 2338, depth: 2.6,
    posClass: 'top-[70%]  left-[0%]',  rotation: '-1.3deg', size: 'w-[215px] h-[139px]',
    filmId: 'film-1', filmTitle: 'This Is My Moment..',
    initialX: '43vw',  initialY: '-28vh',
  },
  {
    src: '/film_grabs/thy-3.jpg',    w: 3840, h: 2160, depth: 4.8,
    posClass: 'top-[81%]  left-[2%]',  rotation: '-2.0deg', size: 'w-[180px] h-[101px]',
    filmId: 'film-2', filmTitle: 'Theyyam – A God Awakens',
    initialX: '42vw',  initialY: '-37vh',
  },
  {
    src: '/film_grabs/sov-3.png',    w: 3600, h: 2338, depth: 3.2,
    posClass: 'top-[91%]  left-[14%]', rotation: '-0.7deg', size: 'w-[185px] h-[120px]',
    filmId: 'film-3', filmTitle: 'The Soul of Varanasi',
    initialX: '30vw',  initialY: '-48vh',
  },
  // ── Right column ────────────────────────────────────────────────────────
  {
    src: '/film_grabs/sov-4.png',    w: 3600, h: 2338, depth: 3.5,
    posClass: 'top-[1%]   right-[2%]', rotation: '1.8deg',  size: 'w-[190px] h-[123px]',
    filmId: 'film-3', filmTitle: 'The Soul of Varanasi',
    initialX: '-41vw', initialY: '42vh',
  },
  {
    src: '/film_grabs/tim-4.png',    w: 3600, h: 2338, depth: 5.0,
    posClass: 'top-[12%]  right-[1%]', rotation: '1.6deg',  size: 'w-[210px] h-[136px]',
    filmId: 'film-1', filmTitle: 'This Is My Moment..',
    initialX: '-42vw', initialY: '30vh',
  },
  {
    src: '/film_grabs/thy-4.jpg',    w: 3840, h: 2160, depth: 7.0,
    posClass: 'top-[23%]  right-[0%]', rotation: '2.2deg',  size: 'w-[195px] h-[110px]',
    filmId: 'film-2', filmTitle: 'Theyyam – A God Awakens',
    initialX: '-43vw', initialY: '21vh',
  },
  {
    src: '/film_grabs/sov-5.png',    w: 2145, h: 1688, depth: 4.0,
    posClass: 'top-[35%]  right-[14%]',rotation: '1.0deg',  size: 'w-[165px] h-[130px]',
    filmId: 'film-3', filmTitle: 'The Soul of Varanasi',
    initialX: '-30vw', initialY: '8vh',
  },
  {
    src: '/film_grabs/tim-5.png',    w: 3600, h: 2338, depth: 2.8,
    posClass: 'top-[47%]  right-[0%]', rotation: '1.4deg',  size: 'w-[240px] h-[156px]',
    filmId: 'film-1', filmTitle: 'This Is My Moment..',
    initialX: '-42vw', initialY: '-6vh',
  },
  {
    src: '/film_grabs/thy-5.jpg',    w: 3840, h: 2160, depth: 5.5,
    posClass: 'top-[59%]  right-[1%]', rotation: '2.0deg',  size: 'w-[205px] h-[115px]',
    filmId: 'film-2', filmTitle: 'Theyyam – A God Awakens',
    initialX: '-42vw', initialY: '-15vh',
  },
  {
    src: '/film_grabs/sov-6.png',    w: 3024, h: 1964, depth: 3.0,
    posClass: 'top-[71%]  right-[0%]', rotation: '1.1deg',  size: 'w-[185px] h-[120px]',
    filmId: 'film-3', filmTitle: 'The Soul of Varanasi',
    initialX: '-44vw', initialY: '-28vh',
  },
  {
    src: '/film_grabs/tim-6.png',    w: 3600, h: 2338, depth: 6.0,
    posClass: 'top-[82%]  right-[2%]', rotation: '1.8deg',  size: 'w-[175px] h-[114px]',
    filmId: 'film-1', filmTitle: 'This Is My Moment..',
    initialX: '-42vw', initialY: '-38vh',
  },
  {
    src: '/film_grabs/thy-6.jpg',    w: 3840, h: 2160, depth: 4.5,
    posClass: 'top-[91%]  right-[14%]',rotation: '2.4deg',  size: 'w-[195px] h-[110px]',
    filmId: 'film-2', filmTitle: 'Theyyam – A God Awakens',
    initialX: '-29vw', initialY: '-47vh',
  },
]

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

/* ── Animation timing ──────────────────────────────────────────────────── */
/* Images burst simultaneously from screen centre, staggered by 70 ms each */
const BURST_DELAY = 0.5
const BURST_EASE  = [0.25, 1, 0.5, 1] as const   // smooth spring settle

export function HeroBanner() {
  return (
    <section className="snap-section relative overflow-hidden bg-[#0B0B0B]">

      {/* ── Cinematic film-strip background ──────────────────────────────── */}
      <HeroCinematicBg />

      {/* ── Floating images — burst from centre, spread to corners ───────── */}
      <div className="hidden sm:block">
      <Floating sensitivity={-1} easingFactor={0.04} className="overflow-hidden">
        {STILLS.map((still, i) => (
          <FloatingElement key={i} depth={still.depth} className={still.posClass}>
            <motion.div
              className="cursor-pointer"
              style={{ rotate: still.rotation }}
              initial={{ x: still.initialX, y: still.initialY, scale: 0.22, opacity: 0 }}
              animate={{ x: 0,              y: 0,              scale: 1,    opacity: 1 }}
              transition={{
                opacity: { delay: BURST_DELAY + i * 0.05, duration: 0.6,  ease: 'easeOut' },
                x:       { delay: BURST_DELAY + i * 0.07, duration: 2.0,  ease: BURST_EASE },
                y:       { delay: BURST_DELAY + i * 0.07, duration: 2.0,  ease: BURST_EASE },
                scale:   { delay: BURST_DELAY + i * 0.07, duration: 2.0,  ease: BURST_EASE },
              }}
              whileHover="hovered"
              onClick={() => scrollToFilm(still.filmId)}
            >
              <motion.div
                className={`overflow-hidden relative ${still.size}`}
                style={{ boxShadow: '0 12px 48px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.4)' }}
                variants={{
                  hovered: {
                    scale: 1.06,
                    boxShadow: '0 22px 64px rgba(0,0,0,0.88), 0 4px 18px rgba(0,0,0,0.6)',
                    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
              >
                <Image
                  src={still.src}
                  width={still.w}
                  height={still.h}
                  alt=""
                  className="w-full h-full object-cover"
                  style={{ filter: 'saturate(0.8) brightness(0.88)' }}
                  priority={i < 9}
                />
                <motion.div
                  className="absolute bottom-0 inset-x-0"
                  style={{
                    padding: '32px 10px 8px',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
                  }}
                  initial={{ opacity: 0, y: 6 }}
                  variants={{
                    hovered: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  <p className="font-body text-center text-[#F2F2F2]"
                    style={{ fontSize: '7px', letterSpacing: '0.28em', textTransform: 'uppercase' }}>
                    {still.filmTitle}
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </FloatingElement>
        ))}
      </Floating>
      </div>

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-[5]"
        style={{
          background:
            'radial-gradient(ellipse 68% 68% at 50% 50%, transparent 28%, rgba(11,11,11,0.45) 65%, rgba(11,11,11,0.82) 100%)',
        }}
      />

      {/* ── Logo wordmark ────────────────────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 flex justify-center z-10 pt-8">
        <motion.button
          className="font-dm cursor-pointer bg-transparent border-0 p-0"
          style={{ ...LOGO_STYLE, color: 'rgba(242,242,242,0.88)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
          onClick={() => { window.location.href = '/' }}
        >
          Theja Mitta
        </motion.button>
      </div>

      {/* ── Caption ──────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center pointer-events-none">
        <motion.p
          className="font-heading text-[#9A9A9A]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize:   'clamp(13px, 3.5vw, 21px)',
            fontStyle:  'italic',
            fontWeight: 400,
            lineHeight: 1.7,
            maxWidth:   '500px',
          }}
        >
          Raw emotion, real people, honest places —<br />
          stories that stay with you long after the frame fades.
        </motion.p>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2.8, duration: 1 }}
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
